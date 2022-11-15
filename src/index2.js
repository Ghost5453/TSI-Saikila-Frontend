import React from 'react';
import ReactDOM from 'react-dom/client';
import {useEffect} from 'react';
import {useState} from 'react';

function FullPage()
{
    let [url, setUrl] = useState("");
    const changeUrl = (event) =>{
        setUrl(event);
    }
    console.log(`Body: ${url}`);
    return(
        console.log(`Retern: ${url}`),
    <div>
        <div>{SearchForm(changeUrl)}</div>
        <div>{GetAPIs(url)}</div>
    </div>
    )
}

function SearchForm(changeUrlEvent)
{
    const baseUrl = 'http://localhost:8080/films/';
    let search = "";
    let searchType = "byTitle";
    let myUrl = baseUrl;

    const handleChangeType = e =>
    {
        searchType = e.target.value;
    }

    const handelChangeSearch = e =>
    {
        search = e.target.value;
    }

    const handleSubmit = e =>
    {
        myUrl = baseUrl + searchType + "/" + search;
        console.log(`In forn: ${myUrl}`);
        changeUrlEvent(myUrl);
    }

    return(
        <form onSubmit={handleSubmit}>
            <select onChange={handleChangeType}>
                <option defaultValue
                value ="byTitle"
                >
                    Search by Title
                </option>
                <option value="byDescription"
                >
                    Search by Description
                </option>
            </select>
            <input type="text" id="Search" onChange={handelChangeSearch}></input>
            <input type="submit" />
        </form>
    );
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