import { FC } from 'react';
import { Link } from 'react-router-dom';
import { translations } from '../../../contexts/translations';
import useLanguage from '../../../hooks/useLanguage';
import '@styles/HeaderLink.css';

interface IHeaderLinkProps {
  to: string;
  text?: string;
  translationKey?: string;
  className?: string;
  onClick?: () => void;
}

export const HeaderLink: FC<IHeaderLinkProps> = ({
  to,
  text,
  translationKey,
  className,
}) => {
  const { language } = useLanguage();

  return (
    <Link to={to} className={className}>
      {translationKey ? translations[language]?.[translationKey] : text}
    </Link>
  );
};
