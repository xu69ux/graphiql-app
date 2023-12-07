import { Route } from 'react-router-dom';
import {
  WelcomePage,
  SignupPage,
  LoginPage,
  GraphiQLPage,
  NotFoundPage,
} from './pages';

export const routes = [
  <Route key='/' path='/' element={<WelcomePage />} />,
  <Route key='/login' path='/login' element={<LoginPage />} />,
  <Route key='/signup' path='/signup' element={<SignupPage />} />,
  <Route key='/graphiql' path='/graphiql' element={<GraphiQLPage />} />,
  <Route key='*' path='*' element={<NotFoundPage />} />,
];
