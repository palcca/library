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

//fill with some data
for (let i = 0; i < 10; i++) {
  myLibrary[i] = new Section(`${i}. fantasy`, "leirasa");
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

showSections(myLibrary);

const newSectionBtn = document.querySelector("#newSectionBtn");
newSectionBtn.addEventListener("click", () => {
  newSectionForm(myLibrary);
  dialog.showModal();

});
