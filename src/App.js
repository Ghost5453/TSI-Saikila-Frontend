import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages";
import Actors from "./pages/actors";
import Films from "./pages/films";

function App()
{
    console.log("App")
    return(
        <Router>
            <Navbar />
            <Routes>
                <Route path='/' exact element={<Home />} />
                <Route path='/actors' element={<Actors />} />
                <Route path='/films' element={<Films />} />
            </Routes>
        </Router>
    )
}

export default App;