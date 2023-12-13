export const PasswordValidIndicator = ({ password }) => {
  const hasLowercase = /(?=.*[a-z])/.test(password);
  const hasUppercase = /(?=.*[A-Z])/.test(password);
  const hasNumber = /(?=.*[0-9])/.test(password);
  const hasSpecial = /(?=.*[!@#$%^&*])/.test(password);
  const hasLength = password && password.length >= 8;

  const totalSteps = 5;
  const passedSteps = [
    hasLowercase,
    hasUppercase,
    hasNumber,
    hasSpecial,
    hasLength,
  ].filter(Boolean).length;
  const progressPercentage = (passedSteps / totalSteps) * 100;
  const opacity = progressPercentage === 0 ? 0 : 1;

  return (
    <div className='password-indicator'>
      <div
        style={{
          backgroundColor: 'var(--grey)',
          width: '100%',
          height: '100%',
          opacity: opacity,
        }}
      >
        <div
          style={{
            backgroundColor: 'var(--green)',
            width: `${progressPercentage}%`,
            height: '100%',
            opacity: opacity,
          }}
        />
      </div>
    </div>
  );
};
