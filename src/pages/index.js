import React from "react";

const Home = () =>
{
    console.log("Home (Pages)");
    return(
        <div
            style=
            {{
                display: 'flex',
                justifyContent: 'Right',
                alignItems: 'Right',
                height: '100vh'
            }}
        >
            <p>Test Home Page</p>
        </div>
    )
}

export default Home;