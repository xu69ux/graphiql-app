interface CustomButtonProps {
  className: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  title: string;
  'data-testid'?: string;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  className,
  onClick,
  type = 'button',
  disabled = false,
  title,
  'data-testid': testId,
}) => (
  <button
    className={className}
    type={type}
    onClick={onClick}
    disabled={disabled}
    data-testid={testId}
  >
    {title}
  </button>
);
