import { Route } from 'react-router-dom';
import {
  WelcomePage,
  SignupPage,
  LoginPage,
  GraphiQLPage,
  NotFoundPage,
} from './pages';
import PrivateRoute from './components/PrivateRoute';

export const routes = [
  <Route key='/' path='/' element={<WelcomePage />} />,
  <Route key='/login' path='/login' element={<LoginPage />} />,
  <Route key='/signup' path='/signup' element={<SignupPage />} />,
  <Route
    key='/graphiql'
    path='/graphiql'
    element={
      <PrivateRoute>
        <GraphiQLPage />
      </PrivateRoute>
    }
  />,
  <Route key='*' path='*' element={<NotFoundPage />} />,
];
