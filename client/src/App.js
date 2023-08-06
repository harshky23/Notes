import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { Authcontext } from "./context/Authcontext";
import NotesDetail from "./components/NotesDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useContext } from "react";

function App() {
  const {user} = useContext(Authcontext);
  return (
    
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={user ? <Home /> : <Navigate to="/login"/>} /> {/*agar user hai tho home page nahi tho login karo*/}
            <Route path="/:id" element={<NotesDetail/>} />   {/* /:id means id is variable and can be changed again in param*/}
            <Route path="/login" element={!user ? <Login/> : <Navigate to="/"/> } />
            <Route path="/signup" element={!user ? <Signup/> : <Navigate to="/"/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  
  );
}

export default App;
