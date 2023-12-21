import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { routes } from './routes';

import { Footer, Header, FallBackUI } from './components';
import { ErrorBoundary } from 'react-error-boundary';
import { ToastContainer } from 'react-toastify';
import { LanguageProvider } from './contexts/LanguageProvider';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className='app'>
      <ErrorBoundary FallbackComponent={FallBackUI}>
        <LanguageProvider>
          <Router>
            <Header />
            <Routes>{routes}</Routes>
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
        </LanguageProvider>
      </ErrorBoundary>
    </div>
  );
}

export default App;
