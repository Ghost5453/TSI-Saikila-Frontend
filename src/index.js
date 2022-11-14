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
                {SearchByTitle()}
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
        <div>{NewSearch()}</div>
    );
}

function NewSearch()
{
    const [change, setChange] = useState(false);
    let url = "";
    let submited = false;
    let objStr = "";

    const urlChange = (event) =>{
        url = event;
    }

    const hasChanged = () =>{
        setChange(true);
        alert(`triggerd has changed Change: ${change}`);
    }

    if(change)
    {
        objStr = DrawManyFilms(url);
        submited = true;
        change = false;
        console.log(`After change obj: ${objStr}`)
        const divParcedObjStr = document.getElementById('parsedObjStrDiv');
        divParcedObjStr.hidden = !submited;
        alert("has changed");
    }

    // is very broken
    return(
        <div id='parsedObjStrDiv'>{parse(objStr)}</div>,
        <div>{NewSearchForm(urlChange, hasChanged)}</div>
    )
}

function NewSearchForm(changeUrlEvent, callChange)
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
        callChange();
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

function SearchForm()
{
    const [searchType, setSearchType] = useState("byTitle");
    const [search, setSearch] = useState("");
    const baseUrl = 'http://localhost:8080/films/';
    const [url, setUrl] = useState(baseUrl);
    const [runDraw, setDraw] = useState(false);
    let myUrl = baseUrl

    const handleSubmit = e =>
    {
        console.log(`type: ${searchType}, search: ${search}`)
        myUrl = baseUrl + searchType + "/" + search;
        console.log(`Search Form: ${myUrl}`);
        alert("Step 1");
        setUrl(myUrl);
        setDraw(true);
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

function DrawSearch()
{
    let url;
    let myObjStr;
    let show = false;
    console.log(`Draw: ${SearchForm.url}`)
    alert("Step 2");
    if(SearchForm.runDraw)
    {
        alert("step 3");
        url = SearchForm.url;
        myObjStr = DrawManyFilms(url);
        console.length(myObjStr);
        show = true;
    }

    if (show)
    {
        alert("step 4 true")
        SearchForm.runDraw = false;
        console.log("Now showing");
        return(
            <div className='form text'>{SearchForm()}</div>,
            <div className='chosenList text'>{parse(myObjStr)}</div>
        );
    }else{
        alert("step 4 false")
        return(
            <div className='form text'>{SearchForm()}</div>
        );
    }
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
