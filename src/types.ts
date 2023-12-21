export interface TypeKind {
  kind: string;
  description: string;
}

export interface FieldType {
  name: string;
  description: string;
  type: TypeKind;
}

export interface Type {
  name: string;
  description: string;
  fields: FieldType[];
  kind: string;
}

export interface Schema {
  types: Type[];
}

export interface IEditorTab {
  id: number;
  code: string;
  name: string;
}
