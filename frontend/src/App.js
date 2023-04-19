import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home'
import Client from './Pages/Client'
import './dist/output.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Client" element={<Client/>} />
      </Routes>
    </Router>
  );
}

export default App;
