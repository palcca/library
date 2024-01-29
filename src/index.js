import _ from 'lodash';
import './style.css';
import { makeCard, layoutCards, newBookForm, showSections } from "./DOMfunctions.js";
import { Book, Section } from "./classes.js";



let myLibrary = [];

//const btnNew = document.querySelector(".btnNew");


for (let i = 0; i < 5; i++) {
    myLibrary[i] = new Section((i + ". section"), "leirasa");
}

/*btnNew.addEventListener("click", () => {
    newBookForm(myLibrary[0]);
});*/

function fill() {

    for (let i = 0; i < 5; i++) {
        let book = new Book(i, "J.L. Armentrout", 430, "no", i)
        myLibrary[0].addBookToSection(book);
    }
}

fill();


showSections(myLibrary);