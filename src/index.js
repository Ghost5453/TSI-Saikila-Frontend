import React from 'react';
import ReactDOM from 'react-dom/client';
import {useEffect} from 'react';
import {useState} from 'react';

function FullPage()
{
    const[search, setSerch] = useState("");
    const[update, setUpdate] = useState(false);
    const baceUrl = "http://localhost:8080/films/all/"
    let myUrl = "http://localhost:8080/films/";

    const changeUpdate = () =>{
        setUpdate(false);
    }

    const handlChange = e =>
    {
        if (e.target.value === "")
        {
            myUrl = "http://localhost:8080/films/"
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

function GetAPIs(url, myUpdate, myChangeUpdate)
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
        if(myUpdate)
        {
            try
            {
                console.log("in try")
                getAPI();
                myChangeUpdate();
            }
            catch(err)
            {
                console.log(err);
            }

        }
       
       
    },[myUpdate])

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