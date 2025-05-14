import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom';
import Student1 from './project/Student';
import Studentmark from './project/Studentmark';
import Signupex from './project/singn';
import Logex from './project/login';
import Weather from './project/Whetherapi';


function App() {
  return (
    <div > 
      <BrowserRouter>
      <Routes> 
        <Route path="/Student" element={<Student1/>}></Route>
        <Route path="/Studentmark" element={<Studentmark/>}></Route>
        <Route path="/signup" element={<Signupex/>}></Route>
        <Route path="/" element={<Logex/>}></Route>
       <Route path="/Weather" element={<Weather/>}></Route>    
         </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
