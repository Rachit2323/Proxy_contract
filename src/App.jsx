
import './App.css'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './Components/Main/Main.jsx'
import Token from './Components/Token/Token';
import Vote from './Components/Vote/Vote.jsx';

function App() {


  return (
    <>
    <Router>
    <Routes>
      <Route path="/" element={<Main/>} />
       <Route path ="/transfer" element={<Token/>}/>
       <Route path ="/vote" element={<Vote/>}/>

    </Routes>
  </Router>
  </>
  )
}

export default App

