import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Details from './paginas/Details';
import Home from './paginas/Home';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} /> {}
          <Route path="/dishes/:id" element={<Details />} /> {}
        </Routes>
      </Router>
    </>
  );
}

export default App;