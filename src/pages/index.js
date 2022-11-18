import React from "react";
import "../App.css";


function FullPage()
{
    return(
        <div>
            <h1 className="title"><u>Adam's Sakila Project</u></h1>
            <p className="text">This is a basic web development project to showcase a range of things that I have learnt throughout my training. This websight uses a range of technologies such as HTML, CSS and React.</p>
            <p className="text">The design philosophy for this sight it to keep it simple. I didn’t want unnecessary clutter, the websight should be clean and efficient. </p>
            <p className="text">Feel free to explore the sight using the navebar at the top.</p>
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