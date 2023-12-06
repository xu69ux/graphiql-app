import { Route } from 'react-router-dom';
import { WelcomePage, AuthPage, GraphiQLPage, NotFoundPage } from '@pages';

export const routes = [
  <Route key='/' path='/' element={<WelcomePage />} />,
  <Route key='/login' path='/login' element={<AuthPage />} />,
  <Route key='/graphiql' path='/graphiql' element={<GraphiQLPage />} />,
  <Route key='*' path='*' element={<NotFoundPage />} />,
];
