import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import '@styles/Logo.css';

interface ILogoProps {
  isScrolled: boolean;
}

export const Logo: FC<ILogoProps> = ({ isScrolled }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`logo ${isScrolled ? 'scrolled' : ''}`}
      onClick={() => navigate('/')}
    >
      GraphiQL IDE
    </div>
  );
};
