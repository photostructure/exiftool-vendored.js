import { Equal } from "./Equal";
import { Expect } from "./Expect";
import { CollectionInfo } from "./MWGTags";
import { strEnum, StrEnumKeys } from "./StrEnum";
import { validateTagName } from "./TagNameValidation";

/**
 * Canonical family-1 string-list tags whose `+=` and `-=` behavior has been
 * audited for exact add and remove edits.
 */
export const TagEditAddTagNames = strEnum(
  "IPTC:CatalogSets",
  "IPTC:Keywords",
  "MIE-Doc:Keywords",
  "XMP-acdsee:Keywords",
  "XMP-dc:Subject",
  "XMP-digiKam:TagsList",
  "XMP-expressionmedia:CatalogSets",
  "XMP-expressionmedia:People",
  "XMP-iptcExt:PersonInImage",
  "XMP-lr:HierarchicalSubject",
  "XMP-mediapro:CatalogSets",
  "XMP-mediapro:People",
  "XMP-microsoft:LastKeywordXMP",
);

/** A flattened MWG structure field supported only for removal. */
export const RegionNameEditTagName = "XMP-mwg-rs:RegionName" as const;

/**
 * Canonical primitive tags supported only for exact removal. Flattened region
 * edits preserve remaining sibling fields, but ExifTool may prune structures
 * left empty and callers must preflight format-specific collision risks
 * described in the usage documentation.
 */
export const TagEditRemoveOnlyTagNames = strEnum(
  "XMP-MP:RegionPersonDisplayName",
  "XMP-acdsee-rs:ACDSeeRegionName",
  RegionNameEditTagName,
  "XMP-xmpDM:Album",
);

// XMP-iptcExt:PersonInImageName is intentionally absent: it is lang-alt, and
// removing its x-default value also deletes nonmatching translations.

/** Every canonical primitive tag supported for removal. */
export const TagEditValueTagNames = strEnum(
  ...TagEditAddTagNames,
  ...TagEditRemoveOnlyTagNames,
);

/** The sole structured tag supported by {@link TagEdit}. */
export const CollectionEditTagName = "XMP-mwg-coll:Collections" as const;

/** Every canonical tag accepted by {@link TagEdit}. */
export const TagEditTagNames = strEnum(
  ...TagEditValueTagNames,
  CollectionEditTagName,
);

export type TagEditTagName = StrEnumKeys<typeof TagEditTagNames>;
export type TagEditAddTagName = StrEnumKeys<typeof TagEditAddTagNames>;
export type TagEditRemoveOnlyTagName = StrEnumKeys<
  typeof TagEditRemoveOnlyTagNames
>;
export type TagEditValueTagName = StrEnumKeys<typeof TagEditValueTagNames>;

export type CollectionPredicate =
  | { CollectionName: string; CollectionURI?: string }
  | { CollectionName?: string; CollectionURI: string };

export interface AddTagEdit {
  tag: TagEditAddTagName;
  operation: "add";
  value: string;
  predicate?: never;
}

export interface RemoveTagEdit {
  tag: TagEditValueTagName;
  operation: "remove";
  value: string;
  predicate?: never;
}

export interface AddCollectionEdit {
  tag: typeof CollectionEditTagName;
  operation: "add";
  value: CollectionInfo;
  predicate?: never;
}

export interface RemoveCollectionEdit {
  tag: typeof CollectionEditTagName;
  operation: "remove";
  predicate: CollectionPredicate;
  value?: never;
}

export type TagEdit =
  AddTagEdit | RemoveTagEdit | AddCollectionEdit | RemoveCollectionEdit;

const CollectionFields = ["CollectionName", "CollectionURI"] as const;
const ListSeparator = String.fromCharCode(31);
const CanonicalTagNamesByLowercase = new Map(
  TagEditTagNames.values.map((tag) => [tag.toLowerCase(), tag]),
);

type PrimitiveCollectionEdit = {
  tag: typeof CollectionEditTagName;
  operation: "remove";
  value: string;
};
type ShiftableDateEdit = {
  tag: "XMP-xmp:CreateDate";
  operation: "remove";
  value: string;
};
type AddRemoveOnlyTagEdit = {
  tag: TagEditRemoveOnlyTagName;
  operation: "add";
  value: string;
};
declare const _primitiveCollectionEditRejected: Expect<
  Equal<PrimitiveCollectionEdit extends TagEdit ? true : false, false>
>;
declare const _shiftableDateEditRejected: Expect<
  Equal<ShiftableDateEdit extends TagEdit ? true : false, false>
>;
declare const _addRemoveOnlyTagEditRejected: Expect<
  Equal<AddRemoveOnlyTagEdit extends TagEdit ? true : false, false>
>;

function editContext(index: number): string {
  return `tag edit at index ${index}`;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (value == null || typeof value !== "object") return false;
  const prototype: unknown = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function validateSupportedTagName(
  tag: unknown,
  index: number,
): asserts tag is TagEditTagName {
  const context = editContext(index);
  validateTagName(tag as string, `${context} tag name`);

  const parts = (tag as string).split(":");
  if (parts.length < 2 || parts.some((part) => part.length === 0)) {
    throw new Error(
      `${context} must use a group-qualified tag name: ${tag as string}`,
    );
  }
  const canonical = CanonicalTagNamesByLowercase.get(
    (tag as string).toLowerCase(),
  );
  if (canonical == null) {
    throw new Error(
      `${context} tag is not supported for exact edits: ${tag as string}`,
    );
  }
  if (tag !== canonical) {
    throw new Error(`${context} must use canonical tag casing ${canonical}`);
  }
}

function validateUnicode(value: string, index: number): void {
  for (const character of value) {
    const codePoint = character.codePointAt(0) ?? 0;
    if (
      codePoint <= 0x8 ||
      codePoint === 0xb ||
      codePoint === 0xc ||
      (codePoint >= 0xe && codePoint <= 0x1f)
    ) {
      throw new Error(
        `${editContext(index)} value contains an XML-invalid control character`,
      );
    }
    // CR is XML-valid, but ExifTool emits a literal 0x0D byte rather than
    // `&#xD;`, and XML 1.0 §2.11 requires parsers to normalize CR and CRLF to
    // LF before reporting content. Only ExifTool's own non-normalizing reader
    // returns the CR; every other consumer sees LF.
    if (codePoint === 0xd) {
      throw new Error(
        `${editContext(index)} value contains a carriage return, which XML parsers normalize to a line feed`,
      );
    }
    if (
      (codePoint >= 0xd800 && codePoint <= 0xdfff) ||
      (codePoint >= 0xfdd0 && codePoint <= 0xfdef) ||
      (codePoint & 0xffff) === 0xfffe ||
      (codePoint & 0xffff) === 0xffff
    ) {
      throw new Error(
        `${editContext(index)} value contains a non-round-tripping Unicode character`,
      );
    }
  }
}

function validateEditString(
  value: unknown,
  index: number,
  allowEmpty = false,
): string {
  if (typeof value !== "string") {
    throw new Error(`${editContext(index)} requires one string value`);
  }
  if (!allowEmpty && value.length === 0) {
    throw new Error(`${editContext(index)} requires a non-empty string value`);
  }
  if (value.includes(ListSeparator)) {
    throw new Error(
      `${editContext(index)} value must not contain ExifTool's list separator`,
    );
  }
  validateUnicode(value, index);
  return value;
}

function validateCollectionFields(
  value: unknown,
  index: number,
  requireCompleteValue: boolean,
): CollectionInfo | CollectionPredicate {
  const context = editContext(index);
  if (!isPlainObject(value)) {
    throw new Error(`${context} requires a Collection object`);
  }

  const descriptors = Object.getOwnPropertyDescriptors(value);
  const fields = Reflect.ownKeys(descriptors);
  if (fields.length === 0) {
    throw new Error(`${context} requires a non-empty predicate`);
  }
  const normalized: Partial<CollectionInfo> = {};
  for (const field of fields) {
    if (
      typeof field !== "string" ||
      !(CollectionFields as readonly string[]).includes(field)
    ) {
      throw new Error(
        `${context} has unknown Collection predicate field ${String(field)}`,
      );
    }
    const descriptor = descriptors[field];
    if (descriptor == null || !("value" in descriptor)) {
      throw new Error(`${context} Collection fields must be data properties`);
    }
    const fieldValue: unknown = descriptor.value;
    if (typeof fieldValue !== "string") {
      throw new Error(`${context} Collection ${field} must be a string`);
    }
    normalized[field as keyof CollectionInfo] = validateEditString(
      fieldValue,
      index,
      true,
    );
  }

  if (
    requireCompleteValue &&
    CollectionFields.some((field) => !Object.hasOwn(normalized, field))
  ) {
    throw new Error(
      `${context} Collection value requires CollectionName and CollectionURI`,
    );
  }

  return normalized as CollectionInfo | CollectionPredicate;
}

function collectionMatches(
  value: CollectionInfo,
  predicate: CollectionPredicate,
): boolean {
  return CollectionFields.every(
    (field) =>
      !Object.hasOwn(predicate, field) || value[field] === predicate[field],
  );
}

function rejectUnorderableConflicts(edits: readonly TagEdit[]): void {
  for (const [index, edit] of edits.entries()) {
    for (let otherIndex = index + 1; otherIndex < edits.length; otherIndex++) {
      const other = edits[otherIndex];
      if (other == null) continue;
      if (
        edit.operation !== "add" ||
        other.operation !== "remove" ||
        edit.tag.toLowerCase() !== other.tag.toLowerCase()
      ) {
        continue;
      }

      const addition = edit;
      const removal = other;
      const conflicts =
        addition.tag === CollectionEditTagName &&
        removal.tag === CollectionEditTagName
          ? collectionMatches(addition.value, removal.predicate)
          : "value" in addition &&
            "value" in removal &&
            (addition as AddTagEdit).value === (removal as RemoveTagEdit).value;

      if (conflicts) {
        throw new Error(
          `${editContext(index)} conflicts with tag edit at index ${otherIndex}: ` +
            "ExifTool cannot preserve add-then-remove because it applies removals before additions for the same value in one write",
        );
      }
    }
  }
}

/**
 * Validate and snapshot edits before any ExifTool task is enqueued.
 */
export function validateTagEdits(
  edits: readonly TagEdit[],
): readonly TagEdit[] {
  if (!Array.isArray(edits) || edits.length === 0) {
    throw new Error("editTags requires at least one tag edit");
  }

  const normalized: TagEdit[] = [];
  for (const [index, edit] of edits.entries()) {
    const context = editContext(index);
    if (!isPlainObject(edit)) {
      throw new Error(`${context} must be an object`);
    }

    if (!Object.hasOwn(edit, "tag") || !Object.hasOwn(edit, "operation")) {
      throw new Error(`${context} requires a tag and operation`);
    }
    const tag = edit.tag;
    const operation = edit.operation;
    validateSupportedTagName(tag, index);
    if (operation !== "add" && operation !== "remove") {
      throw new Error(`${context} has invalid operation ${String(operation)}`);
    }
    const hasValue = Object.hasOwn(edit, "value");
    const hasPredicate = Object.hasOwn(edit, "predicate");
    const value = hasValue ? edit.value : undefined;
    const predicate = hasPredicate ? edit.predicate : undefined;

    if (tag === CollectionEditTagName) {
      if (operation === "add") {
        if (!hasValue || hasPredicate) {
          throw new Error(`${context} Collection addition requires one value`);
        }
        normalized.push({
          tag,
          operation,
          value: validateCollectionFields(value, index, true) as CollectionInfo,
        });
      } else {
        if (!hasPredicate || hasValue) {
          throw new Error(
            `${context} Collection removal requires a non-empty predicate`,
          );
        }
        normalized.push({
          tag,
          operation,
          predicate: validateCollectionFields(predicate, index, false),
        });
      }
    } else {
      if (hasPredicate) {
        throw new Error(
          `${context} uses an unsupported structured edit tag ${tag}`,
        );
      }
      if (!hasValue) {
        throw new Error(`${context} requires one value`);
      }
      const normalizedValue = validateEditString(value, index);
      if (operation === "add") {
        if (!TagEditAddTagNames.includes(tag)) {
          throw new Error(`${context} ${tag} is remove-only`);
        }
        normalized.push({ tag, operation, value: normalizedValue });
      } else {
        normalized.push({ tag, operation, value: normalizedValue });
      }
    }
  }

  rejectUnorderableConflicts(normalized);
  return normalized;
}
