import { GraphQLSchema } from '../types';
import { findTypeByName, findFieldByName } from '../utils/findBy';

const mockSchema: GraphQLSchema = {
  types: [
    {
      name: 'Type1 name',
      kind: 'Type1 kind',
      fields: [
        {
          name: 'Field1 name',
          description: 'Field1 description',
          type: {
            kind: 'Kind1 kind',
            name: 'Kind1 name',
          },
        },
      ],
    },
  ],
};

test('findTypeByName returns the correct type', () => {
  const result = findTypeByName(mockSchema, 'Type1 name');
  expect(result).toEqual({
    name: 'Type1 name',
    kind: 'Type1 kind',
    fields: [
      {
        name: 'Field1 name',
        description: 'Field1 description',
        type: {
          kind: 'Kind1 kind',
          name: 'Kind1 name',
        },
      },
    ],
  });
});

test('findTypeByName returns undefined if type is not found', () => {
  const result = findTypeByName(mockSchema, 'Type2');
  expect(result).toEqual(undefined);
});

test('findFieldByName returns the correct field', () => {
  const result = findFieldByName(mockSchema, 'Field1 name');
  expect(result).toEqual({
    name: 'Field1 name',
    description: 'Field1 description',
    type: {
      kind: 'Kind1 kind',
      name: 'Kind1 name',
    },
  });
});

test('findFieldByName returns undefined if field is not found', () => {
  const result = findFieldByName(mockSchema, 'Field2');
  expect(result).toEqual(undefined);
});
