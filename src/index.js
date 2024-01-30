import _ from "lodash";
import "./style.css";
import "./cardstyle.css";
import "./headerstyle.css";
import "./sidebarstyle.css";
import "./formstyle.css";
import {
  makeCard,
  layoutCards,
  newBookForm,
  showSections,
  newSectionForm,
  clearSectionBar,
} from "./DOMfunctions.js";
import { Book, Section } from "./classes.js";

const myLibrary = [];
const dialog = document.querySelector("dialog");

//fill with some data
for (let i = 0; i < 10; i++) {
  myLibrary[i] = new Section(
    `${i}. fantasy`,
    "loremkjdhfkjahfjklahdfjkahasdasdasdads klhjsad kahsdjlfh asjklhdf jklashdfjklhas jklhfljasdhfjilhasjkd hfljkasdhfl jkasjkdfh asjklhfdljashfjklahsdljfhldjkdfjlad sjkfhasdkjfkjlas hkfljadskjfhakjsd hkjladshfkjasdkjfkjasjkkjsad kjdahfkjkjhkfjd hkjadsh kjlshad kjfhaskl dlaksjh f kjasldkj"
  );
  for (let y = 0; y < 20; y++) {
    const book = new Book(
      y + ". címcíyhdkajfhkaldfhlaskjdfh ",
      "J.L. Armenout",
      430,
      "no",
      i
    );
    myLibrary[i].addBookToSection(book);
  }
}

const hobbit = new Book("A hobbit", "J.R Tolkien", 350, "OLVASVA");
myLibrary[0].addBookToSection(hobbit);

showSections(myLibrary);

const searchBtn = document.querySelector("#searchButton");
const searchText = document.querySelector("#searchBar");
searchBtn.addEventListener("click", ()=>{
  console.log(searchText.value)
  searchForTitle(searchText.value);
});

const newSectionBtn = document.querySelector("#newSectionBtn");
newSectionBtn.addEventListener("click", () => {
  newSectionForm(myLibrary);
  dialog.showModal();
});

function searchForTitle(searchText) {
  let filteredArray = new Section ("searched", "");
  for (let i = 0; i < myLibrary.length; i++) {
    for (let y = 0; y < myLibrary[i].books.length; y++) {
      let a = myLibrary[i].books[y].title.toUpperCase();
      if (a.includes(searchText.toUpperCase())) {
        filteredArray.books.push(myLibrary[i].books[y]);
      }
    }
  }
  layoutCards(filteredArray)
  filteredArray= null;
}

