const Parser = require('rss-parser');
const parser = new Parser();

(async () => {
  try {
    const feed = await parser.parseURL('https://nyaa.si/?page=rss');
    
    console.log(`Titre du flux : ${feed.title}`);
    
    feed.items.forEach(item => {
      console.log(`Titre de l'article : ${item.title}`);
    });
  } catch (error) {
    console.log(error);
  }
})();
