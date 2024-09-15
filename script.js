"use strict";

// data and notes
let dataObjects = Object.create({});

let notesObjects = Object.create({});
///////////////////////////////// LOCAL STORAGE ///////////////////////////////
// Storing data in local storage
const storeDataToLocalStorage = function () {
  window.localStorage.setItem("data", JSON.stringify(dataObjects));
  console.log(window.localStorage);
};

// Storing notes in local storage
const storeNotesToLocalStorage = function () {
  window.localStorage.setItem("notes", JSON.stringify(notesObjects));
  console.log(window.localStorage);
};

//////////////////////////////////////// Selectors ////////////////////////////////////////////
let dataList = document.querySelector("#data-list");

let notesList = document.querySelector("#main-notes-list");

let dataWatermark = document.querySelector(".data-watermark");

let notesWatermark = document.querySelector(".notes-watermark");

let addData = document.querySelector("#add-data");
let addDataBtn = document.querySelector("#add-data-btn");

let addNotes = document.querySelector("#add-notes");
let addNotesBtn = document.querySelector("#add-notes-btn");

////////////////////////////// DATA ELEMENT DOM OUTLINE/STRUCTURE /////////////////////////////////////////

// Function for creating data elements
const createDataElement = function (data) {
  // creating data container inside the data list
  let dataContainer = document.createElement("div");
  dataContainer.classList.add("data-container");
  dataContainer.id = `data-${dataList.children.length}--container`;

  // creating the actual data details
  let dataText = document.createElement("p");
  dataText.classList.add("data-text"); // this is the class of the data
  dataText.textContent = data; // this is the title of the data
  dataText.id = `data-${dataList.children.length}--text`; // assigning an id to the data text

  let dltBtn = document.createElement("div"); // creating the dlt btn
  dltBtn.classList.add("dlt-btn");
  dltBtn.innerHTML = "&times;";
  dltBtn.id = `data-${dataList.children.length}--dlt-btn`;

  // appending the data text and dlt btn to the data content
  dataContainer.appendChild(dataText);
  dataContainer.appendChild(dltBtn);

  // appending inside data list
  dataList.appendChild(dataContainer);
  return dataList.children.length;
};

////////////////////////////// NOTES ELEMENT DOM OUTLINE/STRUCTURE /////////////////////////////////////////

// Function for creating notes elements
const createNoteElement = function (note) {
  // creating note container
  let noteContainer = document.createElement("div");
  noteContainer.classList.add("note-container");
  noteContainer.id = `note-${notesList.children.length}`;

  // creating the note details
  let noteText = document.createElement("p");
  noteText.classList.add("note-text"); // assigning the class to the note
  noteText.textContent = note; // this is the content of the note
  noteText.id = `note-${notesList.children.length}--text`; // assigning an id to the note text

  // creating the dlt btn
  let dltBtn = document.createElement("div");
  dltBtn.classList.add("note-dlt-btn");
  dltBtn.innerHTML = "&times;";
  dltBtn.id = `note-${notesList.children.length}--dlt-btn`;

  // appending the note content elements to the container
  noteContainer.appendChild(noteText);
  noteContainer.appendChild(dltBtn);

  // appending note container to notes list
  notesList.appendChild(noteContainer);
  return notesList.children.length;
};

////////////////////////////////// CREATE FUNCTIONALITY /////////////////////////////////////////////

// Function for creating data

const createData = function () {
  if (addData.value !== "") {
    dataObjects[createDataElement(addData.value) - 1] = addData.value;
    storeDataToLocalStorage();
    console.log(dataObjects);
    addData.value = "";
    dataWatermark.classList.add("hidden");
  }
};

addDataBtn.addEventListener("click", createData);

const createNote = function () {
  if (addNotes.value !== "") {
    notesObjects[createNoteElement(addNotes.value) - 1] = addNotes.value; // createNoteElement returns the length of the list
    storeNotesToLocalStorage();
    console.log(notesObjects);
    addNotes.value = "";
    notesWatermark.classList.add("hidden");
  }
};

addNotesBtn.addEventListener("click", createNote);

//////////////////////////////// DELETE FUNCTIONALITY /////////////////////////////////////////////

// Function for deleting data

dataList.addEventListener("click", function (e) {
  if (e.target.classList.contains("dlt-btn")) {
    e.target.parentElement.remove();
    delete dataObjects[e.target.parentElement.id.split("-")[1]];
    console.log(dataObjects);
    if (dataList.children.length === 1) {
      dataWatermark.classList.toggle("hidden");
      window.localStorage.removeItem("data");
    } else {
      // window.localStorage.removeItem("data");
      // console.log(window.localStorage);
      storeDataToLocalStorage();
    }
  }
});

// Function for deleting notes
notesList.addEventListener("click", function (e) {
  if (e.target.classList.contains("note-dlt-btn")) {
    e.target.parentElement.remove();
    delete notesObjects[e.target.parentElement.id.split("-")[1]];
    console.log(notesObjects);
    if (notesList.children.length === 1) {
      notesWatermark.classList.toggle("hidden");
      window.localStorage.removeItem("notes");
    } else {
      // window.localStorage.removeItem("notes");
      console.log(window.localStorage);
      storeNotesToLocalStorage();
    }
  }
});

//////////////////////////////////// EDITING FUNCTIONALITY //////////////////////////////////////

// Function for editing data

dataList.addEventListener("click", function (event) {
  if (event.target.classList.contains("data-text")) {
    editData(event.target.id.split("-")[1]);
  }
});

const editData = function (data) {
  let dataText = document.querySelector(`#data-${data}--text`); // here data is the ID for the selector
  dataText.contentEditable = true;
  dataText.focus();
  dataText.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      dataText.contentEditable = false;
      dataText.textContent = event.target.textContent;
      dataObjects[Number(data)] = event.target.textContent;
      console.log(dataObjects);
      storeDataToLocalStorage();
    } else if (event.key === "Esc") {
      dataText.contentEditable = false;
      event.preventDefault();
    }
  });
};

// Adding the edit functionality for notes
document
  .querySelector("#main-notes-list")
  .addEventListener("click", function (event) {
    if (event.target.classList.contains("note-text")) {
      editNotes(event.target.id.split("-")[1]);
    }
  });

const editNotes = function (notes) {
  let notesText = document.querySelector(`#note-${notes}--text`); // here notes is the ID for the selector
  notesText.contentEditable = true;
  notesText.focus();
  notesText.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      notesText.contentEditable = false;
      notesText.textContent = event.target.textContent;
      notesObjects[Number(notes)] = event.target.textContent;
      console.log(notesObjects);
      storeNotesToLocalStorage();
    } else if (event.key === "Esc") {
      notesText.contentEditable = false;
      event.preventDefault();
    }
  });
};

/////////////////////////////// INIT FUNCTIONALITY /////////////////////////////////////////////

const init = function () {
  console.log("init triggered");
  console.log(window.localStorage);
  if (window.localStorage.getItem("data")) {
    dataWatermark.classList.add("hidden");
    dataObjects = JSON.parse(window.localStorage.getItem("data"));
    for (let key in dataObjects) {
      createDataElement(dataObjects[key]);
    }
  }

  if (window.localStorage.getItem("notes")) {
    notesWatermark.classList.add("hidden");
    notesObjects = JSON.parse(window.localStorage.getItem("notes"));
    for (let key in notesObjects) {
      createNoteElement(notesObjects[key]);
    }
  }
};
init();
