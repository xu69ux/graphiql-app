import { useState, useEffect } from 'react';
import { ThemeContext } from './ThemeContext';
import { translations } from './translations';
import useLanguage from '../hooks/useLanguage';

export const ThemeProvider = ({ children }) => {
  const { language } = useLanguage();
  const darkTheme = translations?.[language].dark;
  const crazyTheme = translations?.[language].crazy;
  const [theme, setTheme] = useState(darkTheme);

  useEffect(() => {
    setTheme(darkTheme ? darkTheme : crazyTheme);
  }, [language, darkTheme, crazyTheme]);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === crazyTheme ? darkTheme : crazyTheme,
    );
  };

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
