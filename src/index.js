import React from 'react';
import ReactDOM from 'react-dom/client';
import {useEffect} from 'react';
import {useState} from 'react';

function FullPage()
{
   return(
    <div>
        Hello World!
        {DrawRndFilms()}
        {DrawKanya()}
    </div>
   )
    
}

function DrawRndFilms()
{
    const filmJson = GetAPIs('http://localhost:8080/films/rand');
    console.log(filmJson.myJson.filmTitle);
    console.log(filmJson.myJson.filmDescription);

    return(
        <div>
            <br></br>
            Film: {filmJson.myJson.filmTitle}
            <br></br>
            Discription: {filmJson.myJson.filmDescription}
        </div>
    );

   
}

function DrawKanya()
{
    const myAPI = GetAPIs('https://api.kanye.rest');
    
    return(
        <div>
            <br></br>
            Kanye: {myAPI.myJson.quote}
        </div>
    )
}

function GetAPIs(url)
{
    const [myJson, setJson] = useState("");

    const getAPI = async () =>{
        const res = await fetch(url);
        const responce = await res.json();

        console.log(responce.filmTitle)
        console.log(responce.filmDescription)

        setJson(responce);
    }

    useEffect(() =>
    {
        getAPI();
    },[])

    return(
        {myJson}
    )
}


const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <FullPage />
);
