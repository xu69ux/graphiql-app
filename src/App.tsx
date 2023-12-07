import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { routes } from './routes';
import { Footer } from './components';

function App() {
  return (
    <Router>
      <Routes>{routes}</Routes>
      <Footer />
    </Router>
  );
}

export default App;
