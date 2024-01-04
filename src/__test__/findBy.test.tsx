import {
  findTypeByName,
  findFieldByName,
  findKindByName,
} from '../utils/findBy';
import { Type, FieldType, KindType } from '../types';

describe('findBy utility functions', () => {
  const mockTypes: Type[] = [
    { name: 'Type1', description: 'Description1', fields: [], kind: 'Kind1' },
    { name: 'Type2', description: 'Description2', fields: [], kind: 'Kind2' },
  ];

  const mockFields: FieldType[] = [
    {
      name: 'Field1',
      description: 'Description1',
      type: { kind: 'Kind1', description: 'Description1' },
    },
    {
      name: 'Field2',
      description: 'Description2',
      type: { kind: 'Kind2', description: 'Description2' },
    },
  ];

  const mockKinds: KindType[] = [
    { kind: 'Kind1', description: 'Description1' },
    { kind: 'Kind2', description: 'Description2' },
  ];

  test('findTypeByName', () => {
    const result = findTypeByName(mockTypes, 'Type1');
    expect(result).toEqual({
      name: 'Type1',
      description: 'Description1',
      fields: [],
      kind: 'Kind1',
    });
  });

  test('findFieldByName', () => {
    const result = findFieldByName(mockFields, 'Field1');
    expect(result).toEqual({
      name: 'Field1',
      description: 'Description1',
      type: { kind: 'Kind1', description: 'Description1' },
    });
  });

  test('findKindByName', () => {
    const result = findKindByName(mockKinds, 'Kind1');
    expect(result).toEqual({ kind: 'Kind1', description: 'Description1' });
  });
});
