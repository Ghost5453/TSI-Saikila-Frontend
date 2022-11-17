import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages";
import About from "./pages/about";
import Actors from "./pages/actors";
import Films from "./pages/films";
import Search from "./pages/workingSearch";

function App()
{
    console.log("App")
    return(
        <Router>
            <Navbar />
            <Routes>
                <Route path='/' exact element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/actors' element={<Actors />} />
                <Route path='/films' element={<Films />} />
                <Route path='/workingSearch' element={<Search />} />
            </Routes>
        </Router>
    )
}

export default App;