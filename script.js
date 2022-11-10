"use strict";

const formEl = document.getElementById("form-item");
const itemEl = document.getElementById("item");
const resultsEl = document.getElementById("result-item");
const btnEl = document.getElementById("btn");

//Global Variables
let items = [];
let isEditing = false;
let editId = null;

//functions
const displayUI = () => {
  resultsEl.innerHTML = null;
  if (items.length > 0) {
    items.forEach((item) => {
      const listEL = document.createElement("li");
      listEL.classList.add("list");
      listEL.innerHTML = `${item.value} 
      <button onClick = 'editItem(${item.id})'>Edit</button>
      <button onClick = 'deleteItem(${item.id})'>delete</button>`;
      resultsEl.append(listEL);
    });
  }
};

//Functions
const deleteItem = function (id) {
  items = items.filter((item) => item.id != id);
  displayUI();
};
const editItem = function (id) {
  const itemToEdit = items.find((item) => item.id === id);
  itemEl.value = itemToEdit.value;
  editId = id;
  isEditing = true;
  displayUI();
};

//Event Listeners

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  //truthy value & falsy value
  if (itemEl.value) {
    if (isEditing) {
      items = items.map((item) => {
        if (item.id === editId) {
          return { ...item, value: itemEl.value };
        } else {
          return item;
      }
    });
        displayUI();
        isEditing = false;
        editId=null;
        itemEl.value = null;
    }
    else {
      const item = {
        id: new Date().valueOf(),
        value: itemEl.value,
      };
      items.push(item);
      itemEl.value = null;
      // display the item on the UI
      displayUI();}
    } else { 
      alert("enter valid input");
      }
});