import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { routes } from './routes';
import { Footer, Header } from './components';
import { LanguageProvider } from './contexts/LanguageProvider';

import './App.css';

function App() {
  return (
    <div className='App'>
      <LanguageProvider>
        <Router>
          <Header />
          <Routes>{routes}</Routes>
          <Footer />
        </Router>
      </LanguageProvider>
    </div>
  );
}

export default App;
