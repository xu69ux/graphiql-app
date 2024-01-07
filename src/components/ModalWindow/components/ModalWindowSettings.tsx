import { FC } from 'react';
import { ModalWindowButton } from '@components/index';
import { translations } from '@contexts/translations';

interface ModalWindowSettingsProps {
  theme: string;
  language: string;
  onThemeToggle: () => void;
  onLanguageToggle: () => void;
  onLocalClear: () => void;
}

export const ModalWindowSettings: FC<ModalWindowSettingsProps> = ({
  theme,
  language,
  onThemeToggle,
  onLanguageToggle,
  onLocalClear,
}) => (
  <div className='settings'>
    <ModalWindowButton
      title={translations?.[language].themeChange}
      value={theme}
      onClick={onThemeToggle}
    />
    <ModalWindowButton
      title={translations?.[language].languageChange}
      value={language}
      onClick={onLanguageToggle}
    />
    <ModalWindowButton
      title={translations?.[language].localStorage}
      value={translations?.[language].clear}
      onClick={onLocalClear}
    />
  </div>
);
