export const Header = () => {
  const username = 'user';
  const logOut = () => {
    console.log('log out');
  };

  return (
    <header className='header'>
      <nav className='navigator'>
        <div className='logo'>GraphQL IDE</div>
        <div className='user'>
          <span>
            hello, <b>{username}</b>!
          </span>
          <button className='btn logout' onClick={logOut}>
            Log out
          </button>
        </div>
      </nav>
    </header>
  );
};
