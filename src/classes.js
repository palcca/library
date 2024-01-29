class Book {

    constructor(title, author, pages, read, index) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.index = index;
    }

    readBook = () => {
        this.read = "OLVASVA";
    }
}

class Section {

    constructor(name, description) {
        this.name = name;
        this.description = description;
        this.books = [];
    }

    addBookToSection(Book) {
        this.books.push(Book)
    }

    removeBookFromSection(Book) {
        this.books.splice(Book.index, 1);
    }
}

export {
    Book,
    Section
}