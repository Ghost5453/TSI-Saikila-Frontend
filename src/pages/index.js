import React from "react";
import "../App.css";


function FullPage()
{
    return(
        <div>
            <h1 className="title"><u>Adam's Sakila Project</u></h1>
        </div>
    )
}

function Home()
{
    return(
        <center>
            <div className="contentBody">
                {FullPage()}
            </div>
        </center>
    )
}

export default Home;