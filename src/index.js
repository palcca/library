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
  clearSectionBar
} from "./DOMfunctions.js";
import { Book, Section } from "./classes.js";

const myLibrary = [];
const dialog = document.querySelector("dialog");

// const btnNew = document.querySelector(".btnNew");

for (let i = 0; i < 5; i++) {
  myLibrary[i] = new Section(`${i}. fantasy`, "leirasa");
}

/* btnNew.addEventListener("click", () => {
    newBookForm(myLibrary[0]);
}); */

function fill() {
  for (let i = 0; i < 15; i++) {
    const book = new Book(
      i + ". címcíyhdkajfhkaldfhlaskjdfh ",
      "J.L. Armenout",
      430,
      "no",
      i
    );
    myLibrary[0].addBookToSection(book);
  }
}

fill();

showSections(myLibrary);

const newSectionBtn = document.querySelector("#newSectionBtn");
newSectionBtn.addEventListener("click", () => {
  newSectionForm(myLibrary);
  dialog.showModal();

});
