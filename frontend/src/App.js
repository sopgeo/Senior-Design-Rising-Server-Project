import './css/App.css';
import ProjectPage from './pages/ProjectPage'
import Upload from './components/Upload';
import Home from './components/Home';
import Project from './components/Project';
import Search from './components/Search';
import Footer from './components/CsFooter.js';

import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/ab' index element={<ProjectPage/>} />
          <Route path='/' index element={<Home/>} />
          <Route path='/upload' index element={<Upload/>} />
          <Route path='/project' index element={<Project/>} />
          <Route path='/search' index element={<Search/>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
