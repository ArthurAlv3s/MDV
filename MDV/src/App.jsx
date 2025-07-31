import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import LandingPage from "../src/components/Home.jsx"
import Loginpage from "../src/components/LoginPage.jsx"
import RegisterPage from "../src/components/RegisterPage.jsx";
import Ajuda from "../src/components/Ajuda.jsx";
import Sbn from "../src/components/Sbn.jsx";

function App() {
   return (
<BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage/>}/>

      <Route path="/login" element={<Loginpage/>}/>

      <Route path="/registro" element={<RegisterPage/>}/>

      <Route path="/ajuda" element={<Ajuda/>}/>

      <Route path="/sobre" element={<Sbn/>}/>
    </Routes>

</BrowserRouter>
  );
}



export default App;
