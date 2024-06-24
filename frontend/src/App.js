import './css/App.css';
import ProjectPage from './pages/ProjectPage'
import Upload from './components/Upload';
import Home from './components/Home';
import Project from './pages/Project';
import Search from './pages/Search';
import Login from './components/Login';
import GroupManagment from './pages/GroupManagement.js';


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
          <Route path='/groupManagement' index element={<GroupManagment/>} />
          <Route path='/Login' index element={<Login/>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
