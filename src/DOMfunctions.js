import { Book, Section } from "./classes.js";

export function makeCard(Book, Section) {
  const cardButtons = document.createElement("div");
  const removeBtn = document.createElement("button");
  const readBtn = document.createElement("button");
  cardButtons.classList.add("cardButtons");
  removeBtn.classList.add("removeBtn");
  removeBtn.textContent = "x";
  readBtn.classList.add("readBtn");
  readBtn.textContent = "\u2713";
  const card = document.createElement("div");
  card.classList.add("card");
  const title = document.createElement("div");
  title.textContent = Book.title.toUpperCase();
  title.style.textShadow = "rgba(0, 0, 0, 0.205)";
  const author = document.createElement("div");
  author.textContent = Book.author.toUpperCase();
  const pages = document.createElement("div");
  pages.textContent = `${Book.pages} OLDAL`;
  const read = document.createElement("div");
  read.textContent = Book.read.toUpperCase();

  readBtn.addEventListener("click", () => {
    Book.readBook();
    read.textContent = "OLVASTAD";
    layoutCards(Section);
  });

  removeBtn.addEventListener("click", () => {
    Section.removeBookFromSection(Book);
    layoutCards(Section);
  });

  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(cardButtons);
  card.appendChild(author);
  cardButtons.appendChild(removeBtn);
  cardButtons.appendChild(readBtn);

  if (Book.read != "OLVASTAD") {
    readBtn.style.color = "red";
    read.textContent = "NEM OLVASTAD";
  }

  return card;
}

export function layoutCards(Section) {
  const LIBRARY = document.querySelector(".library");

  while (LIBRARY.firstChild) {
    LIBRARY.removeChild(LIBRARY.firstChild);
  }

  for (let i = Section.books.length - 1; i >= 0; i--) {
    const content = makeCard(Section.books[i], Section);
    Section.books[i].index = i;
    LIBRARY.appendChild(content);
  }
}

export function newBookForm(Section) {
  const dialog = document.querySelector("dialog");

  while (dialog.firstChild) {
    dialog.removeChild(dialog.lastChild);
  }

  //form elements
  const formContainer = document.createElement("div");
  formContainer.classList.add("formContainer");
  dialog.appendChild(formContainer);
  const titleContainer = document.createElement("div");
  formContainer.appendChild(titleContainer);
  const titleContainerP = document.createElement("p");
  titleContainerP.textContent = "Könyv Címe:";
  titleContainer.appendChild(titleContainerP);
  const newTitleinput = document.createElement("input", "type=text");
  newTitleinput.classList.add("newTitle");
  titleContainer.appendChild(newTitleinput);
  const authorContainer = document.createElement("div");
  formContainer.appendChild(authorContainer);
  const authorContainerP = document.createElement("p");
  authorContainerP.textContent = "Szerző:";
  authorContainer.appendChild(authorContainerP);
  const newAuthorinput = document.createElement("input", "type=text");
  newAuthorinput.classList.add("newAuthor");
  authorContainer.appendChild(newAuthorinput);
  const pagesContainer = document.createElement("div");
  formContainer.appendChild(pagesContainer);
  const pagesContainerP = document.createElement("p");
  pagesContainerP.textContent = "Oldalszám:";
  pagesContainer.appendChild(pagesContainerP);
  const newPagesinput = document.createElement("input", "type=number");
  newPagesinput.classList.add("newPages");
  pagesContainer.appendChild(newPagesinput);
  const formBtnsCont = document.createElement("div");
  formContainer.appendChild(formBtnsCont);
  const formCancelBtn = document.createElement("button");
  formCancelBtn.classList.add("btnCancel");
  formCancelBtn.textContent = "Mégse";
  formBtnsCont.appendChild(formCancelBtn);
  const formSaveBtn = document.createElement("button");
  formSaveBtn.classList.add("btnSave");
  formSaveBtn.textContent = "Mentés";
  formBtnsCont.appendChild(formSaveBtn);

  dialog.showModal();

  formCancelBtn.addEventListener("click", () => {
    dialog.close();
  });

  formSaveBtn.addEventListener("click", () => {
    const newBookTitle = document.querySelector(".newTitle");
    const newBookAuthor = document.querySelector(".newAuthor");
    const newBookPages = document.querySelector(".newPages");

    if (
      newBookTitle.value == "" ||
      newBookAuthor.value == "" ||
      newBookPages.value < 1
    ) {
      alert("Az összes mező kitöltése kötelező!");
    } else {
      const newBook = new Book(
        newBookTitle.value.toUpperCase(),
        newBookAuthor.value.toUpperCase(),
        newBookPages.value,
        "NEM OLVASTAD",
        Section.books.length
      );
      newBookAuthor.value = "";
      newBookTitle.value = "";
      newBookPages.value = "";
      dialog.close();
      Section.addBookToSection(newBook);
      layoutCards(Section);
    }
  });
}

export function newSectionForm(myLibrary) {
  const dialog = document.querySelector("dialog");

  while (dialog.firstChild) {
    dialog.removeChild(dialog.lastChild);
  }

  const formContainer = document.createElement("div");
  formContainer.classList.add("formContainer");
  dialog.appendChild(formContainer);
  const titleContainer = document.createElement("div");
  formContainer.appendChild(titleContainer);
  const titleContainerP = document.createElement("p");
  titleContainerP.textContent = "Szekció neve: ";
  titleContainer.appendChild(titleContainerP);
  const newTitleinput = document.createElement("input", "type=text");
  newTitleinput.classList.add("newTitle");
  titleContainer.appendChild(newTitleinput);
  const descriptionContainer = document.createElement("div");
  formContainer.appendChild(descriptionContainer);
  const sectionDescription = document.createElement("p");
  sectionDescription.textContent = "Rövid Leírás";
  descriptionContainer.appendChild(sectionDescription);
  const descriptionInput = document.createElement("textarea");
  descriptionInput.classList.add("sectionDescription");
  descriptionContainer.appendChild(descriptionInput);
  const formBtnsCont = document.createElement("div");
  formContainer.appendChild(formBtnsCont);
  const formCancelBtn = document.createElement("button");
  formCancelBtn.classList.add("btnCancel");
  formCancelBtn.textContent = "Mégse";
  formBtnsCont.appendChild(formCancelBtn);
  const formSaveBtn = document.createElement("button");
  formSaveBtn.classList.add("btnSave");
  formSaveBtn.textContent = "Mentés";
  formBtnsCont.appendChild(formSaveBtn);

  formCancelBtn.addEventListener("click", () => {
    dialog.close();
  });

  formSaveBtn.addEventListener("click", () => {
    if (newTitleinput.value == "") {
      alert("Kérlek add meg a szekció nevét!");
    } else {
      const newSection = new Section(
        newTitleinput.value.toUpperCase(),
        descriptionInput.value
      );

      console.log(myLibrary);
      newSection.index = myLibrary.length;
      descriptionInput.value = "";
      newTitleinput.value = "";
      myLibrary.push(newSection);
      clearSectionBar(myLibrary);
      showSections(myLibrary);
      dialog.close();
    }
  });
}

export function editSectionForm(myLibrary, Section) {
  const dialog = document.querySelector("dialog");

  while (dialog.firstChild) {
    dialog.removeChild(dialog.lastChild);
  }

  const formContainer = document.createElement("div");
  formContainer.classList.add("formContainer");
  dialog.appendChild(formContainer);
  const titleContainer = document.createElement("div");
  formContainer.appendChild(titleContainer);
  const titleContainerP = document.createElement("p");
  titleContainerP.textContent = "Szekció neve: ";
  titleContainer.appendChild(titleContainerP);
  const newTitleinput = document.createElement("input", "type=text");
  newTitleinput.classList.add("newTitle");
  titleContainer.appendChild(newTitleinput);
  const descriptionContainer = document.createElement("div");
  formContainer.appendChild(descriptionContainer);
  const sectionDescription = document.createElement("p");
  sectionDescription.textContent = "Rövid Leírás";
  descriptionContainer.appendChild(sectionDescription);
  const descriptionInput = document.createElement("textarea");
  descriptionInput.classList.add("sectionDescription");
  descriptionContainer.appendChild(descriptionInput);
  const formBtnsCont = document.createElement("div");
  formContainer.appendChild(formBtnsCont);
  const formCancelBtn = document.createElement("button");
  formCancelBtn.classList.add("btnCancel");
  formCancelBtn.textContent = "Mégse";
  formBtnsCont.appendChild(formCancelBtn);
  const formSaveBtn = document.createElement("button");
  formSaveBtn.classList.add("btnSave");
  formSaveBtn.textContent = "Mentés";
  formBtnsCont.appendChild(formSaveBtn);

  formCancelBtn.addEventListener("click", () => {
    dialog.close();
  });

  descriptionInput.value = Section.description;  
  newTitleinput.value = Section.name;

  formSaveBtn.addEventListener("click", () => {
    if (newTitleinput.value == "") {
      alert("Kérlek add meg a szekció nevét!");
    } else {

      Section.name = newTitleinput.value.toUpperCase();
      Section.description = descriptionInput.value.toUpperCase();
      const sidebar = document.querySelector(".sidebar");
      for (let i = myLibrary.length + 1; i > 1; i--) {
        sidebar.removeChild(sidebar.lastChild);
      }
      showSections(myLibrary);
      dialog.close();
    }
  });
}

export function clearSectionBar(myLibrary) {
  const sidebar = document.querySelector(".sidebar");
  for (let i = myLibrary.length; i > 1; i--) {
    sidebar.removeChild(sidebar.lastChild);
  }
}

export function showSections(myLibrary) {
  const sidebar = document.querySelector(".sidebar");
  const sectionName = document.querySelector(".sectionName");
  const headerRight = document.querySelector(".headerRight");
  const dialog = document.querySelector("dialog");

  for (let i = 0; i < myLibrary.length; i++) {
    const Sectionlink = document.createElement("button");
    myLibrary[i].index = i;
    Sectionlink.textContent = myLibrary[i].name;
    sidebar.appendChild(Sectionlink);
    Sectionlink.addEventListener("click", () => {
      const focusedBtn = document.querySelector(".focusedBtn");
      if (focusedBtn) {
        focusedBtn.classList.remove("focusedBtn")
      }
      Sectionlink.classList.add("focusedBtn");

      while (headerRight.firstChild) {
        headerRight.removeChild(headerRight.firstChild);
      }
      const editSectionBtn = document.createElement("button");
      editSectionBtn.textContent = "SZERKESZTÉS";
      headerRight.appendChild(editSectionBtn);

      editSectionBtn.addEventListener("click", () => {
        editSectionForm(myLibrary, myLibrary[i]);
        dialog.showModal();
      });
      const newBtn = document.createElement("button");
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
