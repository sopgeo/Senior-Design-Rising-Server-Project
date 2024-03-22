import logo from './logo.svg';
import './css/App.css';
import CsFooter from './components/CsFooter';
import Upload from './components/Upload';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route path='/' index element={<Home/>} /> */}
          <Route path='/Upload' index element={<Upload/>} />

        </Routes>
      </BrowserRouter>

      {/* Uncomment the below line to view and edit upload page */}
      <Upload/>
      <CsFooter/>
    </div>
  );
}

export default App;
