const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const { getCompliment, getFortune, getAllBooks, createBook, deleteBook, updateBook } = require('./controller')

app.get("/api/compliment", getCompliment);

app.get("/api/fortune", getFortune);

app.get("/api/books", getAllBooks)

app.post("/api/books", createBook);

app.delete("/api/books/:id", deleteBook);

app.put("/api/books/:id", updateBook);

app.listen(4000, () => console.log("Server running on 4000"));
