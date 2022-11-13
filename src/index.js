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
    const allFilmsDiv = document.getElementById('allFilmsDiv');
    return(
        <div className='userFunc text'>
            <div className='rndFilm text'>
                Random Film <br></br>
                {DrawRndFilm()}
                <hr></hr>
            </div>
            <div className='allFilms text'>
                All Films <br></br>
                <button onClick={function()
                {
                    allFilmsDiv.hidden = !allFilmsDiv.hidden;
                }}>
                    Click to Toggle All Films
                </button>

                <div id="allFilmsDiv" hidden>{DrawAllFilms()}</div>
            </div>
            <hr></hr>
            <div className='searchFilm text'>
                Search For Films
                <br></br>
                {SearchByTitle()}
                {DrawSearch(SearchForm.url)}
            </div>
        </div>
    )
}

function DrawRndFilm()
{
    const filmJson = GetAPIs('http://localhost:8080/films/rand');

    return(
        <div>
            <p>
                Film: {filmJson.myJson.filmTitle}
                <br></br>
                Discription: {filmJson.myJson.filmDescription}
            </p>
        </div>
    );
}

function SearchByTitle()
{
    // return(
    //     <form>
    //         <select>
    //             <option defaultValue value ="byTitle">Search by Title</option>
    //             <option value="byDescription">Search by Description</option>
    //         </select>
    //         <input type="text" id="Search"></input>
    //         <button>Search</button>
    //     </form>
      
    // )
    return(
        <div>{SearchForm()}</div>
    );
}

function SearchForm()
{
    const [searchType, setSearchType] = useState("byTitle");
    const [search, setSearch] = useState("");
    const baseUrl = 'http://localhost:8080/films/';
    const [url, setUrl] = useState(baseUrl);
    let myUrl = baseUrl

    const handleSubmit = e =>
    {
        console.log(`type: ${searchType}, search: ${search}`)
        myUrl = baseUrl + searchType + "/" + search;
        console.log(myUrl);
        setUrl(myUrl);
    }

    const handleChangeType = e =>{
        setSearchType(e.target.value);
    }

    const handelChangeSearch = e =>{
        setSearch(e.target.value);
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
    )
}

function DrawSearch(myUrl)
{
    console.log(`Draw: ${SearchForm.url}`)
}

function DrawAllFilms()
{
    const filmsStr = DrawManyFilms('http://localhost:8080/films/');

    return(<div>{parse(filmsStr)}</div>)
}


function DrawManyFilms(url)
{
    const manyFilms = GetAPIs(url);
    let reternStr = ``;

    for(let c = 0; c < manyFilms.myJson.length; c++)
    {
        reternStr += `<div className="Film${manyFilms.myJson.at(c).filmID} text">
                        <p> 
                            Film: ${manyFilms.myJson.at(c).filmTitle}
                            <br>
                            Discription: ${manyFilms.myJson.at(c).filmDescription}
                        </p>
                    </div>`
        if (c != manyFilms.myJson.length - 1)
        {
            reternStr += '<br>'
        } 
    }

    return(reternStr);
}

function GetAPIs(url)
{
    const [myJson, setJson] = useState("");

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
       
    },[])

    return(
        {myJson}
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <FullPage />
);
