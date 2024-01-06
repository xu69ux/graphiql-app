import { HeaderLink } from '@components/index';

export const NoUserComponent = () => {
  return (
    <>
      <HeaderLink to='/login' translationKey='login' className='header-link' />
      <span className='link-sep'>/</span>
      <HeaderLink
        to='/signup'
        translationKey='signup'
        className='header-link'
      />
    </>
  );
};
