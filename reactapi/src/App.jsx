import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import PaginaDeCadastro from '../src/page/PaginaDeCadastro';
import ListaUsuariosPage from '../src/page/ListaUsuariosPage';
import HomePage from '../src/page/HomePage'; 

function App() {
  return (
    <Router>
      <Header />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} /> 
          <Route path="/cadastro" element={<PaginaDeCadastro />} />
          <Route path="/usuarios" element={<ListaUsuariosPage />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer position="top-right" autoClose={5000} />
    </Router>
  );
}

export default App;