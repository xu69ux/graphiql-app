import { FC } from 'react';

interface IIconButtonProps {
  className: string;
  title: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export const IconButton: FC<IIconButtonProps> = ({
  className,
  title,
  onClick,
  disabled,
  children,
}) => (
  <button
    className={className}
    title={title}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);
