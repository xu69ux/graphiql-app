import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { routes } from './routes';
import { Footer } from './components';

import './App.css';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>{routes}</Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
