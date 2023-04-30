import './App.css'
import Emote from "./Emote.tsx";
import emotes from './emotes.json'
import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub} from "@fortawesome/free-brands-svg-icons";

function App() {
    const [searchQuery, setSearchQuery] = useState('')
    const [emoteList, setEmoteList] = useState([{
        name:'aha',
        author:'Wczytywanie...',
        authorId:'',
        url:'https://7tv.app/emotes/6287c2ca6d9cd2d1f31b5e7d'
    }])

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
            setTimeout(()=>{setEmoteList(finalEmoteList)}, 500)
        })
    }

    return (
        <>
            <main>
                <header>
                    <h1>Baza emotek z Jasperem</h1>
                    <p>Czegoś tu brakuje? Wykonaj <b>Pull request</b> na <a href={"https://github.com/mxgic1337/dawid-jasper-emotes/"}>GitHub</a>.</p>
                </header>
                <div id={"search"}>
                    <input placeholder={"Wyszukaj emotkę / autora..."} onChange={(e)=>{setSearchQuery(e.target.value)}}/>
                </div>
                <p>Wczytano {emoteList.length}/{emotes.length} emotek <a href={"#"} onClick={()=>{refreshEmotes()}}>Odśwież</a></p>
                <div id={"emotes"}>
                    {emoteList.map((emote)=>{
                        return (emote.name.toLowerCase().includes(searchQuery.toLowerCase()) || emote.author.toLowerCase().includes(searchQuery.toLowerCase()))
                            && <Emote name={emote.name} author={emote.author} authorId={emote.authorId} url={emote.url} key={emote.name}/>
                    })}
                </div>
                <footer>
                    <FontAwesomeIcon icon={faGithub} onClick={()=>{window.open('https://github.com/mxgic1337/dawid-jasper-emotes')}}/>
                </footer>
            </main>
        </>
    )
}

export default App
