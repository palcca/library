const library = (function () {
    let myLibrary = [];
    const LIBRARY = document.querySelector(".library");
    const dialog = document.querySelector("dialog");
    const btnNew = document.querySelector(".btnNew");
    const btnCancel = document.querySelector(".btnCancel");
    const btnSave = document.querySelector(".newSave");

    function Book(title, author, pages, read, index) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.index = index;

        this.readBook = () => {
            this.read = "OLVASVA";
        }

        this.addBookToLibrary = () => {
            myLibrary.push(this);
        }

        this.removeBookFromLibrary = () => {
            myLibrary.splice(this.index, 1);


        }
    }

    function fill() {

        for (i = 0; i < 5; i++) {
            book = new Book("Origin", "J.L. Armentrout", 430, "no", i)
            book.addBookToLibrary();
        }
    }

    function layoutCards() {

        while (LIBRARY.firstChild) {
            LIBRARY.removeChild(LIBRARY.firstChild);
        }
        
        for (i = 0; i < myLibrary.length; i++) {
            let content = makeCard(myLibrary[i]);
            myLibrary[i].index = i;
            LIBRARY.appendChild(content);
        }
    }

    function makeCard(Book) {
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
            layoutCards();
        });

        removeBtn.addEventListener("click", () => {
            Book.removeBookFromLibrary();
            layoutCards();
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

    btnNew.addEventListener("click", () => {
        dialog.showModal();
    });

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
            const newBook = new Book(newBookTitle.value.toUpperCase(), newBookAuthor.value.toUpperCase(), newBookPages.value, newBookRead.value.toUpperCase(), myLibrary.length);
            newBookAuthor.value = "";
            newBookTitle.value = "";
            newBookPages.value = "";
            newBookRead.value = "no";
            newBook.addBookToLibrary();
            layoutCards();
            dialog.close();
        }
    });

    fill();
    layoutCards()
})();