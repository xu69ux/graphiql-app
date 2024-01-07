import { render, fireEvent } from '@testing-library/react';
import { BackButton } from '@components/index';
import { IBackButtonProps } from '../components/Documentation/components/BackButton';

const selectedField = {
  name: 'field',
  description: 'desc',
  type: { kind: 'kind', name: 'name', description: 'desc' },
};
const selectedKind = null;
const selectedType = null;

const setSelectedField = jest.fn();
const setSelectedKind = jest.fn();
const setSelectedType = jest.fn();

const mockProps: IBackButtonProps = {
  selectedField,
  setSelectedField,
  selectedKind,
  setSelectedKind,
  selectedType,
  setSelectedType,
};

describe('BackButton', () => {
  it('applies the className prop correctly', () => {
    const { container } = render(
      <BackButton
        className='test-class'
        selectedField={mockProps.selectedField}
        setSelectedField={mockProps.setSelectedField}
        selectedType={mockProps.selectedType}
        setSelectedType={mockProps.setSelectedType}
        selectedKind={mockProps.selectedKind}
        setSelectedKind={mockProps.setSelectedKind}
      />,
    );

    expect(container.firstChild).toHaveClass('test-class');
  });

  it('renders the IoChevronForward icon', () => {
    const { getByTestId } = render(
      <BackButton
        selectedField={mockProps.selectedField}
        setSelectedField={mockProps.setSelectedField}
        selectedType={mockProps.selectedType}
        setSelectedType={mockProps.setSelectedType}
        selectedKind={mockProps.selectedKind}
        setSelectedKind={mockProps.setSelectedKind}
      />,
    );

    expect(getByTestId('back-button-icon')).toBeInTheDocument();
  });

  it('handles null selected* props correctly', () => {
    const { getByTestId } = render(
      <BackButton
        selectedField={null}
        setSelectedField={setSelectedField}
        selectedType={null}
        setSelectedType={setSelectedType}
        selectedKind={null}
        setSelectedKind={setSelectedKind}
      />,
    );

    fireEvent.click(getByTestId('back-button'));

    expect(setSelectedField).not.toHaveBeenCalled();
    expect(setSelectedType).not.toHaveBeenCalled();
    expect(setSelectedKind).not.toHaveBeenCalled();
  });

  it('calls handleBackClick when clicked', () => {
    const { getByTestId } = render(
      <BackButton
        selectedField={mockProps.selectedField}
        setSelectedField={mockProps.setSelectedField}
        selectedType={mockProps.selectedType}
        setSelectedType={mockProps.setSelectedType}
        selectedKind={mockProps.selectedKind}
        setSelectedKind={mockProps.setSelectedKind}
      />,
    );

    fireEvent.click(getByTestId('back-button'));
  });

  it('displays "Back to Fields" when selectedField is not null', () => {
    const { getByTestId } = render(
      <BackButton
        selectedField={mockProps.selectedField}
        setSelectedField={setSelectedField}
        selectedType={null}
        setSelectedType={setSelectedType}
        selectedKind={null}
        setSelectedKind={setSelectedKind}
      />,
    );

    expect(getByTestId('back-button')).toHaveTextContent('Back to Fields');
  });

  it('displays "Back to Types" when selectedField is null and selectedType is not null', () => {
    const { getByTestId } = render(
      <BackButton
        selectedField={null}
        setSelectedField={setSelectedField}
        selectedType={{ name: 'SomeType', kind: 'SomeKind' }}
        setSelectedType={setSelectedType}
        selectedKind={null}
        setSelectedKind={setSelectedKind}
      />,
    );

    expect(getByTestId('back-button')).toHaveTextContent('Back to Types');
  });

  it('displays "Back to Schema" when selectedField and selectedType are null and selectedKind is not null', () => {
    const { getByTestId } = render(
      <BackButton
        selectedField={null}
        setSelectedField={setSelectedField}
        selectedType={null}
        setSelectedType={setSelectedType}
        selectedKind={{
          name: 'SomeKind',
          kind: 'SomeKimd',
          description: 'SomeDescription',
        }}
        setSelectedKind={setSelectedKind}
      />,
    );

    expect(getByTestId('back-button')).toHaveTextContent('Back to Schema');
  });

  it('calls setSelectedField with null when selectedField is not null', () => {
    const { getByTestId } = render(
      <BackButton
        selectedField={mockProps.selectedField}
        setSelectedField={mockProps.setSelectedField}
        selectedType={mockProps.selectedType}
        setSelectedType={mockProps.setSelectedType}
        selectedKind={mockProps.selectedKind}
        setSelectedKind={mockProps.setSelectedKind}
      />,
    );

    fireEvent.click(getByTestId('back-button'));

    expect(setSelectedField).toHaveBeenCalledWith(null);
  });

  it('calls setSelectedKind with null when selectedKind is not null and selectedField is null', () => {
    const { getByTestId } = render(
      <BackButton
        selectedField={null}
        setSelectedField={setSelectedField}
        selectedType={null}
        setSelectedType={setSelectedType}
        selectedKind={mockProps.selectedKind}
        setSelectedKind={setSelectedKind}
      />,
    );

    fireEvent.click(getByTestId('back-button'));

    expect(setSelectedKind).toHaveBeenCalledWith(null);
  });

  it('calls setSelectedType with null when selectedType is not null, and selectedField and selectedKind are null', () => {
    const { getByTestId } = render(
      <BackButton
        selectedField={null}
        setSelectedField={setSelectedField}
        selectedType={mockProps.selectedType}
        setSelectedType={setSelectedType}
        selectedKind={null}
        setSelectedKind={setSelectedKind}
      />,
    );

    fireEvent.click(getByTestId('back-button'));

    expect(setSelectedType).toHaveBeenCalledWith(null);
  });

  it('calls setSelectedType with selectedType when selectedKind, selectedType and selectedField are not null', () => {
    const { getByTestId } = render(
      <BackButton
        selectedField={mockProps.selectedField}
        setSelectedField={mockProps.setSelectedField}
        selectedType={mockProps.selectedType}
        setSelectedType={mockProps.setSelectedType}
        selectedKind={mockProps.selectedKind}
        setSelectedKind={mockProps.setSelectedKind}
      />,
    );

    fireEvent.click(getByTestId('back-button'));

    expect(setSelectedType).toHaveBeenCalledWith(mockProps.selectedType);
    expect(setSelectedField).toHaveBeenCalledWith(null);
    expect(setSelectedKind).toHaveBeenCalledWith(null);
  });

  it('calls setSelectedType with selectedType when selectedField is null, and selectedKind and selectedType are not null', () => {
    const { getByTestId } = render(
      <BackButton
        selectedField={null}
        setSelectedField={setSelectedField}
        selectedType={mockProps.selectedType}
        setSelectedType={setSelectedType}
        selectedKind={mockProps.selectedKind}
        setSelectedKind={setSelectedKind}
      />,
    );

    fireEvent.click(getByTestId('back-button'));

    expect(setSelectedType).toHaveBeenCalledWith(mockProps.selectedType);
    expect(setSelectedField).toHaveBeenCalledWith(null);
    expect(setSelectedKind).toHaveBeenCalledWith(null);
  });

  it('calls setSelectedType with null when selectedField and selectedType are null, and selectedKind is not null', () => {
    const { getByTestId } = render(
      <BackButton
        selectedField={null}
        setSelectedField={setSelectedField}
        selectedType={null}
        setSelectedType={setSelectedType}
        selectedKind={mockProps.selectedKind}
        setSelectedKind={setSelectedKind}
      />,
    );

    fireEvent.click(getByTestId('back-button'));

    expect(setSelectedType).toHaveBeenCalledWith(null);
    expect(setSelectedField).toHaveBeenCalledWith(null);
    expect(setSelectedKind).toHaveBeenCalledWith(null);
  });
});
