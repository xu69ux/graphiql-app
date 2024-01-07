import { render, screen } from './test-utils';
import { FieldComponent } from '@components/index';
import { NO_DESCRIPTION_MESSAGE } from '@constants/constants';
import { GraphQLField } from '@appTypes/types';

describe('FieldComponent', () => {
  const mockField: GraphQLField = {
    name: 'Test Field',
    description: 'This is a test field',
    type: {
      name: 'Test Type',
      kind: 'Test Kind',
      description: 'This is a test type',
    },
  };

  const mockFieldWithNoDescription: GraphQLField = {
    name: 'Test Field',
    description: undefined,
    type: {
      name: 'Test Type',
      kind: 'Test Kind',
      description: 'This is a test type',
    },
  };

  it('renders the field name and description', () => {
    render(<FieldComponent field={mockField} />);

    expect(screen.getByText(/Test Field field:/i)).toBeInTheDocument();
    expect(screen.getByText(/This is a test field/i)).toBeInTheDocument();
  });

  it('renders the default message when there is no description', () => {
    render(<FieldComponent field={mockFieldWithNoDescription} />);

    expect(screen.getByText(NO_DESCRIPTION_MESSAGE)).toBeInTheDocument();
  });
});
