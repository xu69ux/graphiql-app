import '@styles/FallBackUI.css';

export const FallBackUI = ({ error, resetErrorBoundary }) => {
  const handleClick = () => {
    resetErrorBoundary();
    window.location.reload();
  };

  return (
    <div className='fallback-container'>
      <h1>Something went wrong!</h1>
      <div className='error-container'>
        <span>error: </span>
        <pre>{error.message}</pre>
      </div>
      <button className='btn reset' onClick={handleClick}>
        Reload page
      </button>
    </div>
  );
};
