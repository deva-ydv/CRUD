"use strict";
import { generateID, findNotebook } from "./utils.js";

let notekeeperDB = {};

// initialize a local database if the data exists in local storage, it is loaded
// otherwise, a new empty database structure is created and stored
const initDB = function () {
  const db = localStorage.getItem("notekeeperDB");
  if (db) {
    notekeeperDB = JSON.parse(db);
  } else {
    notekeeperDB.notebooks = [];
    localStorage.setItem("notekeeperDB", JSON.stringify(notekeeperDB));
  }
};

initDB();

// Reads and loads the localStorage data in to the global variable`notekeeperDB`.

const readDB = function () {
  notekeeperDB = JSON.parse(localStorage.getItem("notekeeperDB"));
};

// writes the current state of the global variable `notekeeperDB` to local storage

const writeDB = function () {
  localStorage.setItem("notekeeperDB", JSON.stringify(notekeeperDB));
};

// collections of functions for performing CRUD operations on database
// the database state is managed using global variables and local storage
// Get - Function for retrieving data from the database
// Post - Function for adding data to the database
// Update - Function for updating data in the database
// Delete - Function for deleting data from the database

export const db = {
  post: {
    // adds a new notebook to the database
    notebook(name) {
      readDB();
      const notebookData = {
        id: generateID(),
        name,
        notes: [],
      };
      notekeeperDB.notebooks.push(notebookData);
      writeDB();
      return notebookData;
    },
  },
  get: {
    // Retrives all notebooks from the database
    notebook() {
      readDB();
      return notekeeperDB.notebooks;
    },
  },
  update: {
    // updates the name of a notebook in the database
    notebook(notebookId, name) {
      readDB();
      const notebook = findNotebook(notekeeperDB, notebookId);
      notebook.name = name;
      writeDB();
      return notebook;
    },
  },
};
