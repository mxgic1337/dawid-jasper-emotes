import './App.css'
import Emote from "./Emote.tsx";
import emotes from './emotes.json'
import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub} from "@fortawesome/free-brands-svg-icons";

function App() {
    const [maxEmotes, setMaxEmotes] = useState(40)
    const [searchQuery, setSearchQuery] = useState('')
    const [emoteList, setEmoteList] = useState([{
        name:'Loading',
        author:'Wczytywanie...',
        authorId:'',
        url:'https://7tv.app/emotes/60b9293255c320f0e805d6b9'
    }])

    const loadMore = <>
        <button onClick={showMore}>Wczytaj więcej emotek</button>
        <br />
        <button onClick={showAll} className={"secondary"}>Wczytaj wszystkie emotki</button>
    </>

    function idFromUrl(url:string) {
        return url.split('/')[4]
    }

    useEffect(()=>{
        refreshEmotes()
    }, [])

    function refreshEmotes() {
        const finalEmoteList:{name:string, author:string, authorId:string, url:string}[] = []
        emotes.map((emote)=>{
            fetch('https://7tv.io/v3/emotes/' + idFromUrl(emote)).then(
                async (response)=>{
                    const json = await response.json();
                    finalEmoteList.push({name:json.name,author:json.owner.username,authorId:json.owner.id,url: emote})
                }
            ).catch((err)=>{console.error(err)})
            setTimeout(()=>{setEmoteList(finalEmoteList)}, 1000)
        })
    }

    function showMore() {
        if (maxEmotes<emoteList.length) {setMaxEmotes(maxEmotes + 40);}
    }
    function showAll() {
        setMaxEmotes(emoteList.length)
    }

    return (
        <>
            <main>
                <header>
                    <h1>Zbiór emotek z Jasperem</h1>
                    <p>Jest to projekt stworzony po to, by ułatwić szukanie emotek z Dawidem Jasperem.</p>
                    <p>Czegoś tu brakuje? Wykonaj <b>Pull request</b> na <a href={"https://github.com/mxgic1337/dawid-jasper-emotes/"}>GitHub</a>.</p>
                </header>
                <div id={"search"}>
                    <input placeholder={"Wyszukaj emotkę / autora..."} onChange={(e)=>{setSearchQuery(e.target.value)}}/>
                </div>
                <p>Wczytano <b>{emoteList.length}/{emotes.length}</b> emotek <a href={"#"} onClick={()=>{refreshEmotes()}}>Odśwież</a></p>
                <DisplayingCount maxEmotes={maxEmotes} emotes={emoteList.length} sq={searchQuery}/>
                <div id={"emotes"}>
                    {emoteList.map((emote, i)=>{
                        if (i > maxEmotes && searchQuery.length == 0) {return null}
                        return (emote.name.toLowerCase().includes(searchQuery.toLowerCase()) || emote.author.toLowerCase().includes(searchQuery.toLowerCase()))
                            && <Emote name={emote.name} author={emote.author} authorId={emote.authorId} url={emote.url} key={emote.url}/>
                    })}
                </div>
                <DisplayingCount maxEmotes={maxEmotes} emotes={emoteList.length} sq={searchQuery}/>
                {emoteList.length>maxEmotes && searchQuery.length == 0 ? loadMore : <button className={'secondary'}>To już wszystko <img alt={"aha"} src={"https://cdn.7tv.app/emote/6287c2ca6d9cd2d1f31b5e7d/1x.webp"} className={"btnemote"}/></button>}
                <footer>
                    <FontAwesomeIcon icon={faGithub} onClick={()=>{window.open('https://github.com/mxgic1337/dawid-jasper-emotes')}}/>
                    <p style={{color: 'rgba(255,255,255,.1)'}}>mxgic1337_</p>
                </footer>
            </main>
            <button className={"upButton"} onClick={()=>{window.scrollTo(0, 0);}}>⏫</button>
        </>
    )
}

const DisplayingCount = ({maxEmotes,emotes,sq}:{maxEmotes:number, emotes:number, sq:string})=>{
    return (
        <>
            {sq.length > 0 ? <p>Wyszukiwanie...</p> : <p>Wyświetlanie <b>{maxEmotes > emotes ? emotes : maxEmotes}</b> emotek</p>}
        </>
    )
}

export default App
