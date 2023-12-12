import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { routes } from './routes';
import { Footer, Header } from './components';
import { ToastContainer } from 'react-toastify';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className='App'>
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
    </div>
  );
}

export default App;
