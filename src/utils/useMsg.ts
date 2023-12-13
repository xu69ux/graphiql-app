import { useContext } from 'react';
import { translations } from '../contexts/translations';
import { LanguageContext } from '../contexts/LanguageContext';

const useMsg = () => {
  const languageContext = useContext(LanguageContext) || {
    language: 'eng',
    setLanguage: () => {},
  };
  const { language } = languageContext;
  const msg = {
    COMMON_ERROR: {
      body: translations?.[language]?.commonErrorBody,
      error: true,
    },
    REG_ALREADY_EXIST: {
      body: translations?.[language]?.regAlreadyExistBody,
      error: true,
    },
    LOGIN_USER_NOT_FOUND: {
      body: translations?.[language]?.loginUserNotFoundBody,
      error: true,
    },
    LOG_OUT_SUCCESS: {
      body: translations?.[language]?.logOutSuccesBody,
      error: false,
    },
  };
  return msg;
};

export default useMsg;
