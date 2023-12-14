import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { routes } from './routes';
import { Footer, Header } from './components';
import { ToastContainer } from 'react-toastify';
import { LanguageProvider } from './contexts/LanguageProvider';
import { FallBackUI } from './components/FallBackUI';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className='App'>
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
