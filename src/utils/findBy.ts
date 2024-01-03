import { GraphQLType, GraphQLSchema, GraphQLField } from '../types';

export const findTypeByName = (
  schema: GraphQLSchema,
  typeName: string,
): GraphQLType | undefined => {
  return schema.types.find((type) => type.name === typeName);
};

export const findFieldByName = (
  schema: GraphQLSchema,
  fieldName: string,
): GraphQLField | undefined => {
  for (const type of schema.types) {
    const field = type.fields?.find((field) => field.name === fieldName);
    if (field) {
      return field;
    }
  }
  return undefined;
};

export const findKindByName = (
  schema: GraphQLSchema,
  kindName: string,
): GraphQLType | undefined => {
  return schema.types.find((type) => type.kind === kindName);
};
