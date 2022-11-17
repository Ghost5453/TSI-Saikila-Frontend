import React from 'react';
import ReactDOM from 'react-dom/client';
import {useEffect} from 'react';
import {useState} from 'react';

function Search()
{
    const[search, setSerch] = useState("");
    const[update, setUpdate] = useState(false);
    const baceUrl = "https://sakila-project-1668683367159.azurewebsites.net/films/all/"
    let myUrl = "https://sakila-project-1668683367159.azurewebsites.net/films";

    const changeUpdate = () =>{
        setUpdate(false);
    }

    const handlChange = e =>
    {
        if (e.target.value === "")
        {
            myUrl = "https://sakila-project-1668683367159.azurewebsites.net/films"
        } else
        {
            myUrl = baceUrl + e.target.value
        }
        
        setUpdate(true);
        setSerch(myUrl);
    }

    return(
    <div>
         <input type="text" onChange={handlChange}></input>
         <div>{GetAPIs(search, update, changeUpdate)}</div>
    </div>)
}

function GetAPIs(url)
{
    const [myJson, setJson] = useState([]);

    const getAPI = async () =>{
        const res = await fetch(url);
        const responce = await res.json();

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
    },[url])

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

export default Search;