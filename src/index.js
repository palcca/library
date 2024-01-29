import _ from 'lodash';
import './style.css';
import { makeCard, layoutCards, newBookForm } from "./DOMfunctions.js";
import { Book, Section } from "./classes.js";



let myLibrary = [];

const btnNew = document.querySelector(".btnNew");
let section = new Section("elso", "leirasa");

myLibrary[0]= section;

btnNew.addEventListener("click", () => {
    newBookForm(myLibrary[0]);
});

function fill() {

    for (let i = 0; i < 5; i++) {
        let book = new Book("Origin", "J.L. Armentrout", 430, "no", i)
        myLibrary[0].addBookToSection(book);
    }
}

fill();
layoutCards(myLibrary[0]);
