import React from 'react';
import ReactDOM from 'react-dom/client';
import {useEffect} from 'react';
import {useState} from 'react';
import { useRef } from 'react';

function FullPage()
{
    const[search, setSerch] = useState("http://localhost:8080/films/");
    const searchBox = useRef();
    const baceUrl = "http://localhost:8080/films/all/"
    let myUrl = "http://localhost:8080/films/";

    const handlChange = e =>
    {
        if (e.target.value === "")
        {
            myUrl = "http://localhost:8080/films/"
        } else
        {
            myUrl = baceUrl + e.target.value
        }
        
        setSerch(myUrl);
    }

    return(
    <div>
         <input type="text" ref={searchBox} onChange={handlChange}></input>
         <div>{GetAPIs(search)}</div>
    </div>)
}

function GetAPIs(url)
{
    console.log(`in get api ${url}`);
    const [myJson, setJson] = useState([]);

    const getAPI = async () =>{
        console.log("in async");
        console.log(`url async: ${url}`);
        const res = await fetch(url);
        console.log(res);
        const responce = await res.json();
        console.log(responce);

        console.log("got responce");

        setJson(responce);
    }

    useEffect(() =>
    {
        try
        {
            console.log("in try")
            getAPI();
        }
        catch(err)
        {
            console.log(err);
        }
       
    },[])

    return(
        <div>
            {myJson.map((film) =>(
            <div>
                <p>
                    Film: {film.filmTitle} <br></br>
                    Discription: {film.filmDescription}
                </p>
            </div>
        ))}
        </div>
        
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <FullPage />
);