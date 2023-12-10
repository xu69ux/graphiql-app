import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { routes } from './routes';
import { Footer, Header } from './components';

import './App.css';

function App() {
  return (
    <div className='App'>
      <Router>
        <Header />
        <Routes>{routes}</Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
