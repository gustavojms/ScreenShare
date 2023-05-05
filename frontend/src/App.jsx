import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Teacher from './pages/Teacher'
import Student from './pages/Student'
import './index.css'
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Teacher" element={<Teacher/>}/>
        <Route path="/Student" element={<Student/>} />
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Register" element={<Register/>}/>
      </Routes>
    </Router>
  );
}

export default App
