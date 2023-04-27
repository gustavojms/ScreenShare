import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Teacher from './pages/Teacher'
import Student from './pages/Student'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Teacher/>}/>
        <Route path="/Student" element={<Student/>} />
      </Routes>
    </Router>
  );
}

export default App
