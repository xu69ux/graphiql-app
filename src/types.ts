export interface KindType {
  kind: string;
  description?: string;
}

export interface FieldType {
  name: string;
  description: string;
  type: KindType;
}

export interface Field {
  name: string;
  description: string;
  args: FieldType[];
  type: KindType;
}

export interface Type {
  name: string;
  description: string;
  fields: FieldType[];
  kind: string;
}

interface Directive {
  name: string;
  description: string;
  locations: string[];
}

export interface GraphQLSchema {
  types: Type[];
  directives: Directive[];
}

export interface IEditorTab {
  id: number;
  code: string;
  name: string;
}
