interface CustomButtonProps {
  className: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  title: string;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  className,
  onClick,
  type = 'button',
  disabled = false,
  title,
}) => (
  <button
    className={className}
    type={type}
    onClick={onClick}
    disabled={disabled}
  >
    {title}
  </button>
);
