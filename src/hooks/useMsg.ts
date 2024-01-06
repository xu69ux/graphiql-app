import { translations } from '@contexts/translations';
import useLanguage from './useLanguage';

const useMsg = () => {
  const { language } = useLanguage();
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
    LOCAL_STORAGE_CLEAR_SUCCESS: {
      body: translations?.[language]?.localStorageClearSuccessBody,
      error: false,
    },
  };
  return msg;
};

export default useMsg;
