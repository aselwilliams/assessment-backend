const books = require("./db.json");
let globalId = 4;

module.exports = {

    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
    },
    getFortune: (req, res) => {
        const fortunes = [
            "A beautiful, smart, and loving person will be coming into your life.",
            "A feather in the hand is better than a bird in the air.",
            "A fresh start will put you on your way.",
            "All your hard work will soon pay off.",
            "It’s not the amount of time you devote, but what you devote to the time that counts."
        ]
        let randomIdx = Math.floor(Math.random() * fortunes.length);
        let randomFortune = fortunes[randomIdx];
        res.status(200).send(randomFortune);
    }, 
    getAllBooks: (req, res)=> {
        res.status(200).send(books)
    },
    createBook: (req, res)=> {
        const {title, author, price, img, publishedYear} = req.body;
            let newBook = {
                id: globalId,
                title,
                author,
                price,
                img,
                publishedYear
            }
            books.push(newBook)
            res.status(200).send(books)
            globalId++
    },
    deleteBook: (req, res)=> {
        let {id} = req.params;
        let index = books.findIndex((book)=> book.id===+id)
        books.splice(index, 1);
        res.status(200).send(books)
    },
    updateBook: (req, res)=> {
        let {id} = req.params;
        let {type} = req.body;
        let index= books.findIndex((book)=> book.id===+id)
        if(type==='minus'){
            +books[index].price--
            res.status(200).send(books)
        } else if (type==='plus'){
            +books[index].price++
            res.status(200).send(books)
        } else {
            res.sendStatus(400)
        }
    }
}