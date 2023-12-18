export interface FieldType {
  name: string;
  description: string;
}

export interface Type {
  name: string;
  description: string;
  fields: FieldType[];
}

export interface Schema {
  types: Type[];
}
