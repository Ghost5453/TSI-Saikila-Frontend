import React from 'react';
import ReactDOM from 'react-dom/client';
// import {useEffect} from 'react';
// import {useState} from 'react';

function FullPage()
{
   return(
    <div>
        Hello World!
    </div>
   )
    
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <FullPage />
);
