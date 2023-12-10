import { useEffect, useState } from 'react';
import { auth, logout } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { fetchUserName } from '../services/api/fetchUserName';
import { useNavigate } from 'react-router-dom';
export const GraphiQLPage = () => {
  const [name, setName] = useState('');
  const [user, loading] = useAuthState(auth);
  const fetchData = async () => {
    if (user) {
      const userName = await fetchUserName(user);
      setName(userName);
    }
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return;
    }
    fetchData();
    if (!user) {
      navigate('/');
    }
  }, [user, loading, navigate]);
  return (
    <div>
      <h1>GraphiQL Page</h1>
      Logged in as
      <div>{name}</div>
      <div>{user?.email}</div>
      <button onClick={logout}>logout</button>
    </div>
  );
};
