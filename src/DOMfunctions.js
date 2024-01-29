import { Book, Section } from "./classes.js";

export function makeCard(Book, newLib) {
    let cardButtons = document.createElement("div");
    let removeBtn = document.createElement("button");
    let readBtn = document.createElement("button")
    cardButtons.classList.add("cardButtons");
    removeBtn.classList.add("removeBtn");
    removeBtn.textContent = "X";
    readBtn.classList.add("readBtn");
    readBtn.textContent = "Olvas";
    let card = document.createElement("div");
    card.classList.add("card");
    let title = document.createElement("div");
    title.textContent = Book.title;
    title.style.textShadow = "rgba(0, 0, 0, 0.205)";
    let author = document.createElement("div");
    author.textContent = Book.author;
    let pages = document.createElement("div");
    pages.textContent = Book.pages + " OLDAL";
    let read = document.createElement("div");
    read.textContent = Book.read;

    readBtn.addEventListener("click", () => {
        Book.readBook();
        layoutCards(newLib);
    });

    removeBtn.addEventListener("click", () => {
        newLib.removeBookFromSection(Book);
        layoutCards(newLib);
    });

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(read);
    card.appendChild(cardButtons);
    cardButtons.appendChild(removeBtn);

    if (Book.read != "OLVASVA") {
        cardButtons.appendChild(readBtn);
    }

    return card;
}

export function layoutCards(newLib) {
    const LIBRARY = document.querySelector(".library");

    while (LIBRARY.firstChild) {
        LIBRARY.removeChild(LIBRARY.firstChild);
    }

    for (let i = 0; i < newLib.books.length; i++) {
        let content = makeCard(newLib.books[i], newLib);
        newLib.books[i].index = i;
        LIBRARY.appendChild(content);
    }
}

export function newBookForm(newlib) {
    const dialog = document.querySelector("dialog");
    const btnCancel = document.querySelector(".btnCancel");
    const btnSave = document.querySelector(".newSave");
    dialog.showModal();

    btnCancel.addEventListener("click", () => {
        dialog.close();
    });

    btnSave.addEventListener("click", () => {
        const newBookTitle = document.querySelector(".newTitle");
        const newBookAuthor = document.querySelector(".newAuthor");
        const newBookPages = document.querySelector(".newPages");
        const newBookRead = document.querySelector(".newRead");

        if (newBookTitle.value == "" || newBookAuthor.value == "" || newBookPages.value < 1 || newBookRead.value == "") {
            alert("Az összes mező kitöltése kötelező!")
        } else {
            let newBook = new Book(newBookTitle.value.toUpperCase(), newBookAuthor.value.toUpperCase(), newBookPages.value, newBookRead.value.toUpperCase(), newlib.books.length);
            newBookAuthor.value = "";
            newBookTitle.value = "";
            newBookPages.value = "";
            newBookRead.value = "no";
            dialog.close();
            newlib.addBookToSection(newBook);
            layoutCards(newlib)
        }
    });
}

export function showSections(myLibrary) {
    const sidebar = document.querySelector(".sidebar");
    const sectionName = document.querySelector(".sectionName");
    const headerRight = document.querySelector(".headerRight");
    for (let i = 0; i < myLibrary.length; i++) {
        //dom for showing sections (name and description)
        const Sectionlink = document.createElement("button");
        Sectionlink.textContent = myLibrary[i].name;
        sidebar.appendChild(Sectionlink);

        Sectionlink.addEventListener("click", () => {
            if (headerRight.firstChild){headerRight.removeChild(headerRight.firstChild)};
            const newBtn = document.createElement("button");
            newBtn.classList.add("btnNew");
            newBtn.textContent = "ÚJ KÖNYV";

            newBtn.addEventListener("click", () => {
                newBookForm(myLibrary[i]);
            });
            headerRight.appendChild(newBtn);
            sectionName.textContent = myLibrary[i].name;
            layoutCards(myLibrary[i]);
        });
    }
}
