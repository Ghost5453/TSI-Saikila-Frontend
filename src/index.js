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
                {DrawAllFilms()}
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

function DrawAllFilms()
{
    const allFilms = GetAPIs('http://localhost:8080/films/');
    let reternStr = ``;

    for(let c = 0; c < allFilms.myJson.length; c++)
    {
        console.log(`C: ${c}, Tille: ${allFilms.myJson.at(c).filmTitle}, Discription: ${allFilms.myJson.at(c).filmDescription}, ID: ${allFilms.myJson.at(c).filmID}`);

        reternStr += `<div>
                        <p> 
                            Film: ${allFilms.myJson.at(c).filmTitle}
                            <br></br>
                            Discription: ${allFilms.myJson.at(c).filmDescription}
                        </p>
                    </div>`
        if (c == allFilms.myJson.length - 1)
        {
            reternStr += `<hr>`
        } else{
            reternStr += '<br>'
        }
    }

    return(<div>{parse(reternStr)}</div>)
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
