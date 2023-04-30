function Emote({name,author,authorId,url}:{name:string,author:string,authorId:string,url:string}) {
    function idFromUrl(url:string) {
        return url.split('/')[4]
    }

    return (
        <div className={"emote"} onClick={()=>{window.open(url)}}>
            {idFromUrl(url) !== undefined && <img src={"https://cdn.7tv.app/emote/"+idFromUrl(url)+"/2x.webp"} alt={"Emotka " + name}/>}
            <p className={"name"}>{name}</p>
            <p><a href={"https://7tv.app/users/" + authorId} target={"_blank"}>{author}</a></p>
            <p>Kliknij by otworzyć na 7TV</p>
        </div>
    )
}

export default Emote
