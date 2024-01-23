const library = (function () {
    let myLibrary = [];
    const LIBRARY = document.querySelector(".library");

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

        this.info = function () {
            return title + "," + author + "," + pages + "," + read;
        }
    }

    function fill() {
        for (i = 0; i < 5; i++) {
            book = new Book("Origin", "J.L. Armentrout", 430, "no", i)
            book.addBookToLibrary();
        }
    }

    function layoutBooks() {
        while (LIBRARY.firstChild) {
            LIBRARY.removeChild(LIBRARY.firstChild);
        }
        for (i = 0; i < myLibrary.length; i++) {
            let content = new Card(myLibrary[i]);
            myLibrary[i].index = i;
            LIBRARY.appendChild(content);
        }
    }

    function Card(Book) {
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
            layoutBooks();
        });

        removeBtn.addEventListener("click", () => {
            Book.removeBookFromLibrary();
            layoutBooks();
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


    const dialog = document.querySelector("dialog");
    const btnNew = document.querySelector(".btnNew");

    btnNew.addEventListener("click", () => {
        dialog.showModal();
    });
    const btnCancel = document.querySelector(".btnCancel");

    btnCancel.addEventListener("click", () => {
        dialog.close();
    });
    const btnSave = document.querySelector(".newSave");

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
            layoutBooks();
            dialog.close();
        }
    });

    fill();
    layoutBooks()
})();