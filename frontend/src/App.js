import './css/App.css';
import ProjectPage from './pages/ProjectPage'
import Upload from './components/Upload';
import Home from './components/Home';
import Project from './components/Project';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/ab' index element={<ProjectPage/>} />
          <Route path='/home' index element={<Home/>} />
          <Route path='/upload' index element={<Upload/>} />
          <Route path='/project' index element={<Project/>} />

        </Routes>
      </BrowserRouter>

      {/* Uncomment the below line to view and edit upload page */}
      {/* <Upload/> */}
    </div>
  );
}

export default App;
