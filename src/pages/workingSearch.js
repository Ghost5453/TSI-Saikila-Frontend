import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import '../App.css';

function FullPage()
{
    const[search, setSerch] = useState("");
    const baceUrl = "https://sakila-project-1668683367159.azurewebsites.net/films/all/"
    let myUrl = "https://sakila-project-1668683367159.azurewebsites.net/films";

    const handlChange = e =>
    {
        if (e.target.value === "")
        {
            myUrl = "https://sakila-project-1668683367159.azurewebsites.net/films"
        } else
        {
            myUrl = baceUrl + e.target.value
        }

        setSerch(myUrl);
    }

    return(
    <div>
        <h1 className='title'><u>Find a Film</u></h1>
        <input type="text" onChange={handlChange} id='searchBoxFilm' size={100}></input>
        <p className='text'>Searches can take some time so, please be patient</p>
        <div>{GetAPIs(search)}</div>
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
            <div className={`film${film.filmID}`}>
                <br></br>
                <h2 className='titleS'>
                    {film.filmTitle}
                </h2>
                <div className='text'>
                    {film.filmDescription}
                </div>
            </div>
        ))}
        </div>
        
    )
}

function Search()
{
    return(
        <center>
            <div className="text contentBody">
                {FullPage()}
            </div>
        </center>
    )
}

export default Search;