import React from 'react';
import ReactDOM from 'react-dom/client';
import {useEffect} from 'react';
import {useState} from 'react';
import parse from 'html-react-parser';

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
                <div>{NewFindByName()}</div>             
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
    
    return(
        <div>{}</div>,
        <div>{Search()}</div>
    );
}

function Search()
{
    const [change, setChange] = useState(false);
    const searchDiv = document.getElementById("SearchedFilmsDiv");
    let url = "";
    let submited = false;
    let objStr = "";

    const urlChange = (event) =>{
        url = event;
    }

    const hasChanged = () =>{
        setChange(true);
    }

    if(change)
    {
        objStr = DrawManyFilms(url);
        submited = true;
        change = false;
        console.log(`After change obj: ${objStr}`)
        const divParcedObjStr = document.getElementById('parsedObjStrDiv');
        divParcedObjStr.hidden = !submited;

        if(objStr == "")
        {
            objStr = "<div>No films found</div>";
        }
        searchDiv.hidden = false;
        searchDiv.innerHTML = objStr;
        console.log(objStr);
    }
    
    // is very broken
    return(
        <div>{SearchForm(urlChange, hasChanged)}</div>
    )
}

function NewFindByName()
{
    console.log("new find by");
    const [myUrl, setUrl] = useState("");

    const urlChange = (event) =>{
        setUrl(event);
    }

    console.log("in get api")
    const [myJson, setJson] = useState("");

    const getAPI = async () =>{
        const res = await fetch(myUrl);
        const responce = await res.json();

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
            <div><SearchForm changeUrlEvent={urlChange} /></div>
            <div>{DrawAllFilms(myUrl)}</div>
        </div>
        
    )
}

function DrawSearch(url)
{
    console.log("enter draw seach");
    let objStr = "";

    console.log(`object str: ${objStr}`);

    if (url != "")
    {
        objStr = DrawManyFilms(url);
    }

    if (objStr == "")
    {
        objStr = "<p>No films found</p>";
    }

    console.log(`new object string ${objStr}`);
    return(<div>{parse(objStr)}</div>)

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
        //callChange();
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


function DrawAllFilms()
{
    const filmsStr = DrawManyFilms('http://localhost:8080/films/');

    return(<div>{parse(filmsStr)}</div>)
}


function DrawManyFilms(url)
{
    console.log("In many films");
    const manyFilms = GetAPIs(url);
    let reternStr = ``;

    console.log("befor loop")
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
    console.log("in get api")
    const [myJson, setJson] = useState("");

    const getAPI = async () =>{
        const res = await fetch(url);
        const responce = await res.json();

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
        {myJson}
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <FullPage />
);
