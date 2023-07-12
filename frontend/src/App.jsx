import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Teacher from './pages/Teacher'
import './index.css'
import Register from './pages/Register';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Teacher" element={<Teacher/>}/>
        <Route path="/Register" element={<Register/>}/>
      </Routes>
    </Router>
  );
}

export default App
