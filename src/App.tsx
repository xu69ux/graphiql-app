import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { routes } from './routes';
import { Footer, Header } from './components';

function App() {
  return (
    <Router>
      <Header />
      <Routes>{routes}</Routes>
      <Footer />
    </Router>
  );
}

export default App;
