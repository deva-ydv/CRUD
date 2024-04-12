"use strict";
import {
  addEventOnElements,
  getGreetingMsg,
  activeNotebook,
  makeElemEditable,
} from "./utils.js";
import { Tooltip } from "./components/Tooltip.js";
import { db } from "./db.js";
import { client } from "./client.js";

// Toggle sidebar in small screen

const sidebar = document.querySelector("[data-sidebar]"); // htmlElement
const sidebarTogglers = document.querySelectorAll("[data-sidebar-toggler]"); // arrayHtmlElements
const overlay = document.querySelector("[data-sidebar-overlay]"); // htmlElement

addEventOnElements(sidebarTogglers, "click", function () {
  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");
});

// Initialize tooltip behavior for all DOM elements with 'data-tooltip' attribute
const tooltipElems = document.querySelectorAll("[data-tooltip]");
tooltipElems.forEach((elem) => Tooltip(elem));

// Show greeting msg on homepage
const greetElem = document.querySelector("[data-greeting]");
const currentHour = new Date().getHours();
greetElem.textContent = getGreetingMsg(currentHour);

// Show current data on homepage
const currentDateElem = document.querySelector("[data-current-data]");
currentDateElem.textContent = new Date().toDateString().replace(" ", ",  ");

// notebook field
const sidebarList = document.querySelector("[data-sidebar-list]");
const addNotebookBtn = document.querySelector("[data-add-notebook]");

const showNotebookField = function () {
  const navItem = document.createElement("div");
  navItem.classList.add("nav-item");
  navItem.innerHTML = `
  <span class="text text-label-large" data-notebook-field></span>
  <div class="state-layer"></div>
  `;
  sidebarList.appendChild(navItem);
  const navItemField = navItem.querySelector("[data-notebook-field]");

  // active new created and deactive the last one
  activeNotebook.call(navItem);
  makeElemEditable(navItemField);
  navItemField.addEventListener("keydown", createNotebook);
};
addNotebookBtn.addEventListener("click", showNotebookField);

const createNotebook = function (e) {
  if (e.key === "Enter") {
    // stored new created notebook in database
    const notebookData = db.post.notebook(this.textContent || "Untitled");
    this.parentElement.remove();
    // Render navItem
    client.notebook.create(notebookData);
  }
};

// Renders the existing notebook list by retrieving data from the database
// and passing it to the client

const renderExistedNotebook = function () {
  const notebookList = db.get.notebook();
  client.notebook.read(notebookList);
};

renderExistedNotebook();
