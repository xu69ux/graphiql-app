import { useState, useEffect } from 'react';
import '@styles/Fade.css';

export const Fade = ({ show, children }) => {
  const [shouldRender, setRender] = useState(false);

  useEffect(() => {
    if (show) {
      setRender(true);
    } else {
      const timeoutId = setTimeout(() => setRender(false), 300);
      return () => clearTimeout(timeoutId);
    }
  }, [show]);

  return (
    shouldRender && (
      <div style={{ animation: `${show ? 'fadeIn' : 'fadeOut'} 0.3s` }}>
        {children}
      </div>
    )
  );
};
