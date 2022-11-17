import React from "react";
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
                    <NavLink to = "/about">
                        About
                    </NavLink>
                    <NavLink to ="/actors">
                        Actors
                    </NavLink>
                    <NavLink to ="/films">
                        Films
                    </NavLink>
                    <NavLink to ="/workingSearch">
                        Search 
                    </NavLink>
                </NavMenu>
            </Nav>
        </div>
    );
};

export default Navbar;