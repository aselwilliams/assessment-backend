const complimentBtn = document.getElementById("complimentButton");
const fortuneBtn = document.querySelector("#fortuneButton");
const form = document.querySelector("form");
const bookContainer = document.querySelector("#book-container");

const getCompliment = () => {
  axios.get("http://localhost:4000/api/compliment/").then((res) => {
    const data = res.data;
    alert(data);
  });
};

complimentBtn.addEventListener("click", getCompliment);

const getFortune = () => {
  axios.get("http://localhost:4000/api/fortune/").then((res) => {
    const data = res.data;
    alert(data);
  });
};

fortuneBtn.addEventListener("click", getFortune);

const baseURL = "http://localhost:4000/api/books";

const getAllBooks = () =>
  axios
    .get(baseURL)
    .then((res) => {
      const books = res.data;
      renderBooks(books);
    })
    .catch((err) => console.log(err));

const createBook = (body) =>
  axios
    .post(baseURL, body)
    .then((res) => {
      const books = res.data;
      renderBooks(books);
    })
    .catch((err) => console.log(err));

const deleteBook = (id) =>
  axios
    .delete(`${baseURL}/${id}`)
    .then((res) => {
      const books = res.data;
      renderBooks(books);
    })
    .catch((err) => console.log(err));

const updateBook = (id, type) =>
  axios
    .put(`${baseURL}/${id}`, { type })
    .then((res) => {
      const books = res.data;
      renderBooks(books);
    })
    .catch((err) => console.log(err));

function handleSubmit(e) {
  e.preventDefault();

  let bookTitle = document.querySelector("#title");
  let bookAuthor = document.querySelector("#author");
  let bookYear = document.querySelector("#publishedYear");
  let bookPrice = document.querySelector("#price");
  let bookImg = document.querySelector("#img");

  let newBook = {
    title: bookTitle.value,
    author: bookAuthor.value,
    publishedYear: bookYear.value,
    price: bookPrice.value,
    img: bookImg.value,
  };
  createBook(newBook);

  bookTitle.value = "";
  bookAuthor.value = "";
  bookYear.value = "";
  bookPrice.value = "";
  bookImg.value = "";
}

function createCard(item) {
  let { title, author, price, publishedYear, img, id } = item;
  const el = `
    <section class='card'>
        <img src="${img}" alt='${title}'/>
        <h4>${title}</h4>
        <p><b>Author:</b> ${author}</p>
        <div class='btn-wrapper'>
            <button onclick="updateBook('${id}', 'minus')">-</button>
            <h5><b>Price: </b>$${price}</h5>
            <button onclick="updateBook('${id}', 'plus')">+</button>
        </div>
        <div class='btn-wrapper'>
            <h5><b>Publication Year: </b>${publishedYear}</h5>
            <button class='delete-btn' onclick="deleteBook('${id}')">remove</button>
        </div>
    </section>`;
  bookContainer.innerHTML += el;
}

function renderBooks(arr) {
  bookContainer.innerHTML = "";
  arr.map((el) => createCard(el));
}

form.addEventListener("submit", handleSubmit);

window.addEventListener("DOMContentLoaded", getAllBooks);
