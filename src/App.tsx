import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import {
  Footer,
  Header,
  FallBackUI,
  Loader,
  PrivateRoute,
} from '@components/index';
import { ErrorBoundary } from 'react-error-boundary';
import { ToastContainer } from 'react-toastify';
import { LanguageProvider } from '@contexts/LanguageProvider';
import { ThemeProvider } from '@contexts/ThemeProvider';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const WelcomePage = lazy(() => import('@pages/WelcomePage'));
const LoginPage = lazy(() => import('@pages/LoginPage'));
const SignupPage = lazy(() => import('@pages/SignupPage'));
const GraphiQLPage = lazy(() => import('@pages/GraphiQLPage'));
const NotFoundPage = lazy(() => import('@pages/NotFoundPage'));

function App() {
  return (
    <div className='app'>
      <ErrorBoundary FallbackComponent={FallBackUI}>
        <LanguageProvider>
          <ThemeProvider>
            <Router>
              <Header />
              <Suspense fallback={<Loader />}>
                <Routes>
                  <Route path='/' element={<WelcomePage />} />
                  <Route path='/login' element={<LoginPage />} />
                  <Route path='/signup' element={<SignupPage />} />
                  <Route key='/private-route' element={<PrivateRoute />}>
                    <Route
                      key='/graphiql'
                      path='/graphiql'
                      element={<GraphiQLPage />}
                    />
                  </Route>
                  <Route path='*' element={<NotFoundPage />} />
                </Routes>
              </Suspense>
              <Footer />
              <ToastContainer
                position='top-center'
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme='light'
              />
            </Router>
          </ThemeProvider>
        </LanguageProvider>
      </ErrorBoundary>
    </div>
  );
}

export default App;
