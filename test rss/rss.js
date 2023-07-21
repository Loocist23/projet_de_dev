//je veux lire un flux rss et voir tout ce que ca me donne

const Parser = require('rss-parser');
const parser = new Parser();

//ceci n'est pas pour un bot discord

async function rss() {
    const feed = await parser.parseURL('https://nyaa.si/?page=rss');
    console.log(feed.title);
    console.log(feed.description);
    console.log(feed.link)


    feed.items.forEach(item => {
        console.log(item.title + ' : ' + item.link + ' : ' + item.pubDate + "\n")
    })
}

rss();