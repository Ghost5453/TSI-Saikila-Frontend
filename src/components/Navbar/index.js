import React from "react";
import "../../App.css"
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
} from "./NavbarElements";

const Navbar = () => {
    return(
        <div>
            <Nav>
                <Bars />

                <NavMenu>
                    <NavLink to = "/" className="text">
                        Home
                    </NavLink>
                    <NavLink to ="/actors" className="text">
                        Actors
                    </NavLink>
                    <NavLink to ="/films" className="text">
                        Films
                    </NavLink>
                </NavMenu>
            </Nav>
        </div>
    );
};

export default Navbar;