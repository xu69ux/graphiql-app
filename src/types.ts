export interface GraphQLSchema {
  types: GraphQLType[];
}
export interface GraphQLType {
  name: string;
  kind: string;
  fields?: GraphQLField[];
}

export interface GraphQLField {
  name: string;
  description?: string;
  type: GraphQLKind;
}

export interface GraphQLKind {
  kind: string;
  name: string;
  description?: string;
}

export interface IEditorTab {
  id: number;
  code: string;
  name: string;
}
