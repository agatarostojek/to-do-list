//Selectors
const todoInput = document.querySelector(".todo__input");
const todoButton = document.querySelector(".todo__button");
const todoList = document.querySelector(".todo__list");

//Event Listeners
todoButton.addEventListener("click", addTodo);

//Functions
function addTodo(event) {
  event.preventDefault();

  //Create Div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo__div");
  todoList.appendChild(todoDiv);

  //Create element
  const todoElement = document.createElement("li");
  todoElement.innerHTML = todoInput.value;
  todoElement.classList.add("div__element");
  todoDiv.appendChild(todoElement);

  //Create completed button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("element__button--completed");
  todoDiv.appendChild(completedButton);

  //Create delete button
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
  deleteButton.classList.add("element__button--delete");
  todoDiv.appendChild(deleteButton);

  //Clear the input
  todoInput.value = "";
}
