import { Type, FieldType, KindType } from '../types';

export const findTypeByName = (types: Type[], name: string): Type | undefined =>
  types.find((t) => t.name === name);

export const findFieldByName = (
  fields: FieldType[],
  name: string,
): FieldType | undefined => fields.find((f) => f.name === name);

export const findKindByName = (
  kinds: KindType[],
  kindName: string,
): KindType | undefined => {
  return kinds.find((kind) => kind.kind === kindName);
};
