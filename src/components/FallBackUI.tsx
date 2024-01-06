import { reloadPage } from '@utils/reloadPage';
import { translations } from '@contexts/translations';
import useLanguage from '@hooks/useLanguage';

import '@styles/FallBackUI.css';

export const FallBackUI = ({ error, resetErrorBoundary }) => {
  const { language } = useLanguage();

  const handleClick = () => {
    resetErrorBoundary();
    reloadPage();
  };

  return (
    <div className='fallback-container'>
      <h1>{translations?.[language].fallback}</h1>
      <div className='error-container'>
        <span>{translations?.[language].error}: </span>
        <pre>{error.message}</pre>
      </div>
      <button className='btn reset' onClick={handleClick}>
        {translations?.[language].reloadPage}
      </button>
    </div>
  );
};
