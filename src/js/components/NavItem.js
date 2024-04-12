"use strict";

// Creates a navigation item representing a notebook . This item
// displays the notebook's name, allows editing
// and deletion of the notebooks and handles click events to dispaly
// it associated notes

import { Tooltip } from "./Tooltip.js";
import { activeNotebook, makeElemEditable } from "../utils.js";
import { db } from "../db.js";
import { client } from "../client.js";

const notePanelTitle = document.querySelector("[data-note-panel-title]");

export const NavItem = function (id, name) {
  const navItem = document.createElement("div");
  navItem.classList.add("nav-item");
  navItem.setAttribute("data-notebook", id);
  navItem.innerHTML =  `
    <span class="text text-label-large" data-notebook-field
            >${name}</span
          >
          <button
            class="icon-btn small"
            aria-label="Edit notebook"
            data-tooltip="Edit notebook"
            data-edit-btn
          >
            <span class="material-symbols-rounded" aria-hidden="true"
              >edit</span
            >
            <div class="state-layer"></div>
          </button>
          <button
            class="icon-btn small"
            aria-label="Delete notebook"
            data-tooltip="Delete notebook"
            data-delete-btn
          >
            <span class="material-symbols-rounded" aria-hidden="true"
              >Delete</span
            >
            <div class="state-layer"></div>
          </button>
    `;
  //  show tooltip on edit and delete button
  const tooltipElems = navItem.querySelectorAll("[data-tooltip]");
  tooltipElems.forEach((elem) => Tooltip(elem));

  // handles the click event on the navigation item.
  // updates the note panel's title retrives the associated notes,
  // and marks the item as active

  navItem.addEventListener("click", function () {
    notePanelTitle.textContent = name;
    activeNotebook.call(this);
  });
// Notebook edit functionality 
  const navItemEditBtn = navItem.querySelector("[data-edit-btn]");
  const navItemField = navItem.querySelector("[data-notebook-field]");

  navItemEditBtn.addEventListener(
    "click",
    makeElemEditable.bind(null, navItemField)
  );

  navItemField.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      this.removeAttribute("contenteditable");
      // update edited data in database
      const updatedNotebookData = db.update.notebook(id, this.textContent);
      // Render updated notebook
      client.notebook.update(id, updatedNotebookData);
    }
  });

  // Notebook delete functionality
  const navItemDeleteBtn = navItem.querySelector('[data-delete-btn]');
  navItemDeleteBtn.addEventListener('click', function(){
    const modal = DeleteConfirmModal()
  })
  return navItem;
};
