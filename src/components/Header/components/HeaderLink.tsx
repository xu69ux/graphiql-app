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
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const HeaderLink: FC<IHeaderLinkProps> = ({
  to,
  text,
  translationKey,
  className,
  onClick,
}) => {
  const { language } = useLanguage();

  return (
    <Link to={to} className={className} onClick={onClick}>
      {translationKey ? translations[language]?.[translationKey] : text}
    </Link>
  );
};
