export type Defined<T> = T extends undefined ? never : T;

export type DefinedOrNullValued<T> = {
  [P in keyof T]: Defined<T[P]> | null;
};
