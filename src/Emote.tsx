function Emote({name, url}:{name:string, url:string}) {
    function idFromUrl(url:string) {
        return url.split('/')[4]
    }

    return (
        <div className={"emote"} onClick={()=>{window.open(url)}}>
            <img src={"https://cdn.7tv.app/emote/"+idFromUrl(url)+"/4x.webp"}/>
            <p className={"name"}>{name}</p>
            <p className={"desc"}>Kliknij by otworzyć na 7TV</p>
        </div>
    )
}

export default Emote
