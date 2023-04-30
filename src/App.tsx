import './App.css'
import Emote from "./Emote.tsx";
import emotes from './emotes.json'
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub} from "@fortawesome/free-brands-svg-icons";

function App() {
    const [searchQuery, setSearchQuery] = useState('')

    return (
        <>
            <main>
                <header>
                    <h1>Baza emotek z Jasperem</h1>
                    <p>Czegoś tu brakuje? Wykonaj <b>Pull request</b> na <a href={"https://github.com/mxgic1337/dawid-jasper-emotes/"}>GitHub</a>.</p>
                </header>
                <div id={"search"}>
                    <input placeholder={"Wyszukaj emotki..."} onChange={(e)=>{setSearchQuery(e.target.value)}}/>
                </div>
                <div id={"emotes"}>
                    {emotes.map((emote)=>{
                        return emote.name.toLowerCase().includes(searchQuery.toLowerCase()) && <Emote name={emote.name} url={emote.url} key={emote.name}/>
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
