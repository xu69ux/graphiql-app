import { useNavigate } from 'react-router-dom';

import '@styles/Logo.css';

export const Logo = ({ isScrolled }) => {
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
