import './css/App.css';
import CsFooter from './components/CsFooter';
import ProjectPage from './pages/ProjectPage'

import Upload from './components/Upload';
import Home from './components/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' index element={<ProjectPage/>} />
          <Route path='/Upload' index element={<Upload/>} />

        </Routes>
      </BrowserRouter>

      {/* Uncomment the below line to view and edit upload page */}
      {/* <Upload/> */}
      <CsFooter/>
    </div>
  );
}

export default App;
