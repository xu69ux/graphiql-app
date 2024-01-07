import { render, fireEvent } from '@testing-library/react';
import { ModalWindowSettings } from '@components/index';
import { translations } from '@contexts/translations';

describe('ModalWindowSettings', () => {
  it('renders correctly', () => {
    const onThemeToggle = jest.fn();
    const onLanguageToggle = jest.fn();
    const onLocalClear = jest.fn();

    const { getByText } = render(
      <ModalWindowSettings
        theme='light'
        language='eng'
        onThemeToggle={onThemeToggle}
        onLanguageToggle={onLanguageToggle}
        onLocalClear={onLocalClear}
      />,
    );

    expect(getByText(`${translations.eng.themeChange}:`)).toBeInTheDocument();
    expect(
      getByText(`${translations.eng.languageChange}:`),
    ).toBeInTheDocument();
    expect(getByText(`${translations.eng.localStorage}:`)).toBeInTheDocument();
  });

  it('calls onThemeToggle when the theme button is clicked', () => {
    const onThemeToggle = jest.fn();
    const onLanguageToggle = jest.fn();
    const onLocalClear = jest.fn();

    const { getByText } = render(
      <ModalWindowSettings
        theme='light'
        language='eng'
        onThemeToggle={onThemeToggle}
        onLanguageToggle={onLanguageToggle}
        onLocalClear={onLocalClear}
      />,
    );

    fireEvent.click(getByText('light'));
    expect(onThemeToggle).toHaveBeenCalled();
  });
});
