"use strict";

export const addEventOnElements = function (elements, eventType, callback) {
  elements.forEach((element) => element.addEventListener(eventType, callback));
};

export const getGreetingMsg = function (currentHour) {
  const greeting =
    currentHour < 5
      ? "Night"
      : currentHour < 12
      ? "Morning"
      : currentHour < 15
      ? "Noon"
      : currentHour < 17
      ? "Afternoon"
      : currentHour < 20
      ? "Evening"
      : "Night";
  return `Good ${greeting}`;
};

let lastActiveNavItem;
export const activeNotebook = function () {
  lastActiveNavItem?.classList.remove("active");
  this.classList.add("active");
  lastActiveNavItem = this;
};
export const makeElemEditable = function (element) {
  element.setAttribute("contenteditable", true);
  element.focus();
};

// Generates a unique ID based on the current timestamp

 export const generateID = function () {
  return new Date().getDate().toString();
};
