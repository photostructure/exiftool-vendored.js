import { join } from "path";
import { ExifDateTime } from "./ExifDateTime";
import { DefaultExifToolOptions, ExifTool } from "./ExifTool";
import { ExifToolOptions, handleDeprecatedOptions } from "./ExifToolOptions";
import {
  IPTC_JPG,
  end,
  expect,
  randomChars,
  testDir,
  testImg,
} from "./_chai.spec";

describe("ExifToolOptions", () => {
  describe(".struct", () => {
    let et: ExifTool;
    afterEach(() => end(et));

    for (const struct of ["undef", 0, 2] as const) {
      it(JSON.stringify({ struct }) + " reads and writes flat", async () => {
        et = new ExifTool({ struct });
        await assertFlatRead();
        await assertFlatWrite();
      });
    }
    for (const struct of [1, 2] as const) {
      it(JSON.stringify({ struct }) + " reads and writes trees", async () => {
        et = new ExifTool({ struct });
        await assertTreeRead();
        await assertTreeWrite();
      });
    }

    async function assertFlatRead() {
      const t = await et.read(join(testDir, IPTC_JPG));
      const exp = {
        Headline: "IPTC CORE : HEADLINE",
        Instructions: "IPTC CORE: INSTRUCTIONS",
        Source: "IPTC CORE: SOURCE",
        State: "IPTC CORE: STATE/PROVENCE",
        TransmissionReference: "IPTC CORE: JOB IDENTIFIER",
        CopyrightOwnerID: "IPTC EXT: COPYRIGHT OWNER ID",
        CopyrightOwnerName: "IPTC EXT: COPYRIGHT OWNER NAME",
        ImageCreatorID: "IPTC EXT: CREATOR ID",
        ImageCreatorName: "IPTC EXT: CREATOR NAME",
        ImageSupplierID: "IPTC EXT: IMAGE SUPPLIER ID",
        ImageSupplierName: "IPTC EXT: IMAGE SUPPLIER NAME",
        ImageSupplierImageID: "IPTC EXT: SUPPLIERS IMAGE ID",
        LicensorEmail: "IPTC EXT: LICENSOR EMAIL",
        LicensorID: "IPTC EXT: LICENSOR ID",
        LicensorName: "IPTC EXT: LICENSOR NAME",
        LicensorTelephone1: "IPTC EXT: LICENSOR PHONE NUMBER (WORK)",
        LicensorTelephone2: "IPTC EXT: LICENSOR PHONE NUMBER (CELL)",
        LicensorTelephoneType1: "Work",
        LicensorTelephoneType2: "Cell",
        LicensorURL: "IPTC EXT: LICENSOR WEB",
        MinorModelAgeDisclosure: "Age Unknown",
        // ModelReleaseID: "IPTC EXT: MODEL RELEASE ID", // this is an array when we use struct:2 (!!)
        ModelReleaseStatus: "None",
        // PropertyReleaseID: "IPTC EXT: PROPERTY RELEASE ID", // this is an array when we use struct:2 (!!)
        PropertyReleaseStatus: "Not Applicable",
        DocumentID: "A6E51ECEABAD128BF18F740237B2B651",
        HistoryAction: ["saved", "saved"],
        HistoryChanged: ["/metadata", "/metadata"],
        HistoryInstanceID: [
          "xmp.iid:a03f189e-e83b-4b7e-9efb-ed1d992c80a4",
          "xmp.iid:84f506e5-c3f8-4b7f-b42c-4eb4f2824ca1",
        ],
        HistorySoftwareAgent: [
          "Adobe Photoshop Camera Raw 15.5",
          "Adobe Photoshop Camera Raw 16.3 (Macintosh)",
        ],
        HistoryWhen: [
          "2024:05:07 21:49:02+01:00",
          "2024:06:07 12:04:31+01:00",
        ].map((ea) => ExifDateTime.fromEXIF(ea)),
        InstanceID: "xmp.iid:84f506e5-c3f8-4b7f-b42c-4eb4f2824ca1",
        OriginalDocumentID: "A6E51ECEABAD128BF18F740237B2B651",
      };
      expect(t).to.containSubset(exp);
    }

    async function assertFlatWrite() {
      const img = await testImg({ srcBasename: IPTC_JPG });
      const exp = {
        Headline: "IPTC CORE : HEADLINE: " + randomChars(),
        Instructions: "IPTC CORE: INSTRUCTIONS: " + randomChars(),
        Source: "IPTC CORE: SOURCE: " + randomChars(),
        State: "IPTC CORE: STATE/PROVENCE: " + randomChars(),
        CopyrightOwnerName: "IPTC EXT: COPYRIGHT OWNER NAME: " + randomChars(),
        ImageCreatorName: "IPTC EXT: CREATOR NAME: " + randomChars(),
        LicensorName: "IPTC EXT: LICENSOR NAME: " + randomChars(),
      };
      await et.write(img, exp);
      const t = await et.read(img);
      expect(t).to.containSubset(exp);
    }

    async function assertTreeRead() {
      const t = await et.read(join(testDir, IPTC_JPG));
      expect(t).to.containSubset({
        Headline: "IPTC CORE : HEADLINE",
        Instructions: "IPTC CORE: INSTRUCTIONS",
        Source: "IPTC CORE: SOURCE",
        State: "IPTC CORE: STATE/PROVENCE",
        TransmissionReference: "IPTC CORE: JOB IDENTIFIER",
        CopyrightOwner: [
          {
            CopyrightOwnerID: "IPTC EXT: COPYRIGHT OWNER ID",
            CopyrightOwnerName: "IPTC EXT: COPYRIGHT OWNER NAME",
          },
        ],
        ImageCreator: [
          {
            ImageCreatorID: "IPTC EXT: CREATOR ID",
            ImageCreatorName: "IPTC EXT: CREATOR NAME",
          },
        ],
        ImageSupplier: [
          {
            ImageSupplierID: "IPTC EXT: IMAGE SUPPLIER ID",
            ImageSupplierName: "IPTC EXT: IMAGE SUPPLIER NAME",
          },
        ],
        ImageSupplierImageID: "IPTC EXT: SUPPLIERS IMAGE ID",
        Licensor: [
          {
            LicensorEmail: "IPTC EXT: LICENSOR EMAIL",
            LicensorID: "IPTC EXT: LICENSOR ID",
            LicensorName: "IPTC EXT: LICENSOR NAME",
            LicensorTelephone1: "IPTC EXT: LICENSOR PHONE NUMBER (WORK)",
            LicensorTelephone2: "IPTC EXT: LICENSOR PHONE NUMBER (CELL)",
            LicensorTelephoneType1: "Work",
            LicensorTelephoneType2: "Cell",
            LicensorURL: "IPTC EXT: LICENSOR WEB",
          },
        ],
        MinorModelAgeDisclosure: "Age Unknown",
        ModelReleaseID: ["IPTC EXT: MODEL RELEASE ID"],
        ModelReleaseStatus: "None",
        PropertyReleaseID: ["IPTC EXT: PROPERTY RELEASE ID"],
        PropertyReleaseStatus: "Not Applicable",
        DocumentID: "A6E51ECEABAD128BF18F740237B2B651",
        History: [
          {
            Action: "saved",
            Changed: "/metadata",
            InstanceID: "xmp.iid:a03f189e-e83b-4b7e-9efb-ed1d992c80a4",
            SoftwareAgent: "Adobe Photoshop Camera Raw 15.5",
            When: ExifDateTime.fromEXIF("2024:05:07 21:49:02+01:00"),
          },
          {
            Action: "saved",
            Changed: "/metadata",
            InstanceID: "xmp.iid:84f506e5-c3f8-4b7f-b42c-4eb4f2824ca1",
            SoftwareAgent: "Adobe Photoshop Camera Raw 16.3 (Macintosh)",
            When: ExifDateTime.fromEXIF("2024:06:07 12:04:31+01:00"),
          },
        ],
      });
    }

    async function assertTreeWrite() {
      const img = await testImg({ srcBasename: IPTC_JPG });
      const exp = {
        Headline: "IPTC CORE : HEADLINE: " + randomChars(),
        Instructions: "IPTC CORE: INSTRUCTIONS: " + randomChars(),
        Source: "IPTC CORE: SOURCE: " + randomChars(),
        State: "IPTC CORE: STATE/PROVENCE: " + randomChars(),
        ImageCreator: [
          {
            ImageCreatorID: "IPTC EXT: CREATOR ID: " + randomChars(),
            ImageCreatorName: "IPTC EXT: CREATOR NAME: " + randomChars(),
          },
        ],
        CopyrightOwner: [
          {
            CopyrightOwnerID: "IPTC EXT: COPYRIGHT OWNER ID: " + randomChars(),
            CopyrightOwnerName:
              "IPTC EXT: COPYRIGHT OWNER NAME: " + randomChars(),
          },
        ],
        Licensor: [
          {
            LicensorEmail: "IPTC EXT: LICENSOR EMAIL: " + randomChars(),
            LicensorID: "IPTC EXT: LICENSOR ID: " + randomChars(),
            LicensorName: "IPTC EXT: LICENSOR NAME: " + randomChars(),
          },
        ],
      };
      await et.write(img, exp);
      const t = await et.read(img);
      expect(t).to.containSubset(exp);
    }
  });

  describe("handleDeprecatedOptions", () => {
    for (const imageHashType of [
      undefined,
      "MD5",
      "SHA256",
      "SHA512",
      false,
    ] as const) {
      for (const opts of [
        { includeImageDataMD5: true, expected: "MD5" },
        { includeImageDataMD5: false, expected: false },
        { includeImageDataMD5: undefined, expected: undefined },
      ]) {
        const args: Partial<
          Pick<ExifToolOptions, "includeImageDataMD5" | "imageHashType">
        > = { includeImageDataMD5: opts.includeImageDataMD5 };
        if (imageHashType != null) args.imageHashType = imageHashType;
        const expected = imageHashType ?? opts.expected;
        it(`(${JSON.stringify(args)}) -> ${expected}`, () => {
          expect(handleDeprecatedOptions(args).imageHashType).to.eql(expected);
          const et = new ExifTool(args);
          expect(et.options.imageHashType).to.eql(
            expected ?? DefaultExifToolOptions.imageHashType,
          );
        });
      }
    }
  });
});
