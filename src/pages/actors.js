import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import '../App.css';

function FullPage()
{
    const[search, setSerch] = useState("");
    const baceUrl = "https://sakila-project-1668683367159.azurewebsites.net/actors/name/like/"
    let myUrl = "https://sakila-project-1668683367159.azurewebsites.net/actors";

    const handlChange = e =>
    {
        if (e.target.value === "")
        {
            myUrl = "https://sakila-project-1668683367159.azurewebsites.net/actors"
        } else
        {
            myUrl = baceUrl + e.target.value
        }

        setSerch(myUrl);
    }

    return(
    <div>
        <h1 className='title'><u>Find an Actor</u></h1>
        <input type="text" onChange={handlChange} id='searchBoxActors' size={100}></input>
        <p className='text'>
            You can actors by ether there first or last name by typing in the box.<br></br>
            It will search automatically as you type.<br></br>
            Searches can take some time so, please be patient.
        </p>
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
            {myJson.map((actor) =>(
            <div className={`actor${actor.id}`}>
                <br></br>
                <h2 className='titleS'>
                    {actor.actorFirstName}&emsp;{actor.actorLastName}
                </h2>
            </div>
        ))}
        </div>
        
    )
}


function Actors()
{
    return(
        <center>
            <div className="contentBody">
                {FullPage()}
            </div>
        </center>
    )
}

export default Actors;