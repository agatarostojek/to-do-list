//SELECTORS
const todoContainer = document.querySelector(".todo__container");
const todoInput = document.querySelector(".todo__input");
const todoButton = document.querySelector(".todo__button");
const todoList = document.querySelector(".todo__list");
const selectButton = document.querySelector(".select__button");
const select = document.querySelector(".select__filter");

//EVENT LISTENERS
document.addEventListener("DOMContentLoaded", getLocalStorage);
todoButton.addEventListener("click", addTodoTask);
todoList.addEventListener("click", deleteComplete);
select.addEventListener("change", filtersDisplay);

//FUNCTIONS
function createTodoElement() {
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo__div");
  todoList.appendChild(todoDiv);

  //create todo li
  const todoElement = document.createElement("li");
  todoElement.classList.add("todo__element");
  todoElement.innerHTML = todoInput.value;
  todoDiv.appendChild(todoElement);

  //create completed button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("element__button--completed");
  todoDiv.appendChild(completedButton);

  //create delete button
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
  deleteButton.classList.add("element__button--delete");
  todoDiv.appendChild(deleteButton);

  if (todoList.children !== 0) {
    todoContainer.classList.remove("hide");
  }
}

function addTodoTask(event) {
  event.preventDefault();

  //Check the input value
  if (todoInput.value === "") {
    return;
  }

  createTodoElement();

  //Filter creation
  selectButton.innerHTML = '<i class="fas fa-filter"></i>';
  select.classList.add("select__filter--display");

  //Local Storage call
  saveLocally(todoInput.value);

  //Clear the input
  todoInput.value = "";
}

//Delete and Complete functionality
function deleteComplete(e) {
  const clickItem = e.target;
  if (clickItem.classList[0] === "element__button--delete") {
    const clickItemParent = clickItem.parentElement;
    console.log(clickItemParent);
    //Animation await, remove item
    clickItemParent.classList.add("button__delete--animation");
    removeLocalStorage(clickItemParent);
    clickItemParent.addEventListener("transitionend", function () {
      clickItemParent.remove();

      if (todoList.childNodes.length === 0) {
        todoContainer.classList.add("hide");
      }
    });
  }

  if (clickItem.classList[0] === "element__button--completed") {
    clickItem.parentElement.classList.toggle("button__completed--modifier");
  }
}

//Filtering functionality
function filtersDisplay() {
  const todoTasks = todoList.children;
  switch (select.value) {
    case "all":
      for (i = 0; i < todoTasks.length; i++) {
        todoTasks[i].classList.remove("hide");
      }
      break;
    case "completed":
      for (i = 0; i < todoTasks.length; i++) {
        if (!todoTasks[i].classList.contains("button__completed--modifier")) {
          todoTasks[i].classList.add("hide");
        } else {
          todoTasks[i].classList.remove("hide");
          selectButton.parentElement.classList.remove("hide");
        }
      }
      break;
    case "uncompleted":
      for (i = 0; i < todoTasks.length; i++) {
        if (todoTasks[i].classList.contains("button__completed--modifier")) {
          todoTasks[i].classList.add("hide");
        } else {
          todoTasks[i].classList.remove("hide");
        }
      }
      break;
  }
}

function saveLocally(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getLocalStorage() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo__div");
    todoList.appendChild(todoDiv);

    //create todo li
    const todoElement = document.createElement("li");
    todoElement.classList.add("todo__element");
    todoElement.innerHTML = task;
    console.log(task);
    todoDiv.appendChild(todoElement);

    //create completed button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("element__button--completed");
    todoDiv.appendChild(completedButton);

    //create delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("element__button--delete");
    todoDiv.appendChild(deleteButton);

    if (todoList.children !== 0) {
      todoContainer.classList.remove("hide");
    }
    //Filter creation
    selectButton.innerHTML = '<i class="fas fa-filter"></i>';
    select.classList.add("select__filter--display");
  });
}

//Remove local storage
function removeLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  const taskIndex = task.children[0].innerText;
  tasks.splice(tasks.indexOf(taskIndex, 1));
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
