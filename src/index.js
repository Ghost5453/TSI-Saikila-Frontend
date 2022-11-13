import React from 'react';
import ReactDOM from 'react-dom/client';
import {useEffect} from 'react';
import {useState} from 'react';
import parse from "html-react-parser";

function FullPage()
{
   return(
    <div>
        {UserFunctions()}
    </div>
   )
    
}

function AdminFunctions()
{

}

function UserFunctions()
{
    return(
        <div className='userFunc text'>
            <div className='rndFilm text'>
                Random Film <br></br>
                {DrawRndFilm()}
                <hr></hr>
            </div>
            <div className='allFilms text'>
                All Films <br></br>
                {DrawAllFilmsStandalone()}
            </div>
        </div>
    )
}

function DrawRndFilm()
{
    const filmJson = GetAPIs('http://localhost:8080/films/rand');

    return(
        <div>
            <br></br>
            Film: {filmJson.myJson.filmTitle}
            <br></br>
            Discription: {filmJson.myJson.filmDescription}
        </div>
    );
}

function DrawAllFilmsStandalone()
{
    const url = 'http://localhost:8080/films/'
    const [myJson, setJson] = useState("");
    let reternStr = ``;

    const getAPI = async () =>{
        const res = await fetch(url);
        const responce = await res.json();

        console.log(responce);

        setJson(responce);
    }

    useEffect(() =>
    {
        try
        {
            getAPI();
        }
        catch(err)
        {
            console.log(err);
        }
       
    },[])

    console.log(myJson.at(0))

    for (let c = 0; c < myJson.length; c++)
    {
        reternStr += `<div>
                        <p>Film: ${myJson.at(c).filmTitle}</p>
                        <p>Discription: ${myJson.at(c).filmDescription}</p>`
        if(c != myJson.length - 1)
        {
            reternStr += `<br></br></div>`
        }else
        {
            reternStr += `</div><hr></hr>`
        }
    }

   return(<div>{parse(reternStr)}</div>);

}

function DrawAllFilms()
{
    
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

        console.log(responce);

        setJson(responce);
    }

    useEffect(() =>
    {
        try
        {
            getAPI();
        }
        catch(err)
        {
            console.log(err);
        }
       
    },[])

    return(
        {myJson}
    )
}

function GetManyAPIs(url)
{
    const [myJson, setJson] = useState("");

    const getAPI = async () =>{
        const res = await fetch(url);
        const responce = await JSON.parse(res.json());

        setJson(responce);
    }

    useEffect(() =>
    {
        try{
            getAPI();
        }catch(err)
        {
            console.log(err);
        }
       
    },[])

    return(
        {myJson}
    )
}



const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <FullPage />
);
