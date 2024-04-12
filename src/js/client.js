"use strict";
import { NavItem } from "./components/NavItem.js";
import { activeNotebook } from "./utils.js";

const sidebarList = document.querySelector("[data-sidebar-list]");
const notePanelTitle = document.querySelector("[data-note-panel-title]");

// The client object manages interactions with the user interface
//  to create,read, update, delete notebooks and notes
// It provides functions for performing these operations and updating
// UI accordingly

export const client = {
  notebook: {
    create(notebookData) {
      const navItem = NavItem(notebookData.id, notebookData.name);
      sidebarList.appendChild(navItem);
      activeNotebook.call(navItem);
      notePanelTitle.textContent = notebookData.name;
    },
    // Read and Display a list of notebooks in the UI
    read(notebookList) {
      notebookList.forEach((notebookData, index) => {
        const navItem = NavItem(notebookData.id, notebookData.name);

        if (index === 0) {
          activeNotebook.call(navItem);
          notePanelTitle.textContent = notebookData.name;
        }

        sidebarList.appendChild(navItem);
      });
    },
    // updates the UI to reflect changes in notebooks
    update(notebookId, notebookData){
        const oldNotebook = document.querySelector(`[data-notebook="${notebookId}"]`)
        const newNotebook = NavItem(notebookData.id, notebookData.name)
        notePanelTitle.textContent = notebookData.name;
        sidebarList.replaceChild(newNotebook, oldNotebook)
        activeNotebook.call(newNotebook)
    }
  },
};
