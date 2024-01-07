import { FC } from 'react';
import { ModalWindowSetting } from '@components/index';
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
    <ModalWindowSetting
      title={translations?.[language].themeChange}
      value={theme}
      onClick={onThemeToggle}
    />
    <ModalWindowSetting
      title={translations?.[language].languageChange}
      value={language}
      onClick={onLanguageToggle}
    />
    <ModalWindowSetting
      title={translations?.[language].localStorage}
      value={translations?.[language].clear}
      onClick={onLocalClear}
    />
  </div>
);
