export interface GraphQLType {
  name: string;
  kind: string;
  description?: string;
  fields?: GraphQLField[];
}

export interface GraphQLField {
  name: string;
  description?: string;
  type: GraphQLType;
}

export interface GraphQLSchema {
  types: GraphQLType[];
}

export interface IEditorTab {
  id: number;
  code: string;
  name: string;
}
