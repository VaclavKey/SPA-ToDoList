const tasks = [];
document.addEventListener('DOMContentLoaded', renderRoot);
document.addEventListener('DOMContentLoaded', checkStorage);

function renderRoot() {
  ///////////////////////////
  // Initializing elements //
  ///////////////////////////

  // Main container
  let toDoList = document.createElement('div');
  toDoList.classList.add('to-do-list');

  // Input elements
  let taskInput = document.createElement('div');
  let inputField = document.createElement('input');
  let inputButton = document.createElement('button');

  taskInput.classList.add('task-input');
  inputField.classList.add('input-field');
  inputButton.classList.add('input-button');

  inputField.setAttribute('id', 'input');
  inputField.setAttribute('type', 'text');
  inputField.setAttribute('placeholder', 'Title...');

  inputButton.addEventListener('click', function() {
    const input = this.previousElementSibling.value;
    addTask(input);
  });
  inputButton.textContent = 'Add';

  // Tasks container
  let taskList = document.createElement('ul');
  taskList.classList.add('task-list');
  taskList.setAttribute('id', 'task-list');

  // Sort elements
  let taskSortButtons = document.createElement('div');
  let sortButtonNew = document.createElement('button');
  let sortButtonOld = document.createElement('button');

  taskSortButtons.classList.add('task-sort-buttons');
  sortButtonNew.classList.add('sort-button');
  sortButtonOld.classList.add('sort-button');

  sortButtonNew.setAttribute('id', 'sort-button-new');
  sortButtonOld.setAttribute('id', 'sort-button-old');

  sortButtonNew.addEventListener('click', function() { sortTasks('new')});
  sortButtonOld.addEventListener('click', function() { sortTasks('old')});

  sortButtonNew.textContent = 'Newest';
  sortButtonOld.textContent = 'Oldest';

  ////////////////////////
  // Appending elements //
  ////////////////////////

  // Composing input
  taskInput.appendChild(inputField);
  taskInput.appendChild(inputButton)

  // Composing sort
  taskSortButtons.appendChild(sortButtonNew);
  taskSortButtons.appendChild(sortButtonOld);

  // Composing to-do list
  toDoList.appendChild(taskInput);
  toDoList.appendChild(taskList);
  toDoList.appendChild(taskSortButtons);

  // Composing whole document
  document.getElementById('root').appendChild(toDoList);
}


function addTask() {

}

function renderTask(input) {
  // Getting text from input-field

  let task = document.createElement('li');
  task.classList.add('task');

  let description = document.createElement('span');
  description.classList.add('description');
  description.textContent = input;

  let removeButton = document.createElement('button');
  removeButton.classList.add('remove-button');
  removeButton.addEventListener('click', function () { 
    removeTask(this) 
  });

  // Adding this task to array
  const id = Date.now();
  task.setAttribute('id', id);

  // Updating localStorage

  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  tasks.push({id: id, desc: description, createdAt: new Date().toISOString()});

  localStorage.setItem('tasks', JSON.stringify(tasks));

  // Composing
  task.appendChild(description);
  task.appendChild(removeButton);
  document.getElementById('task-list').appendChild(task);
}

function removeTask(button) {
  const task = button.parentElement;
  document.getElementById('task-list').removeChild(task);

  // Updating localStorage

  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  tasks.splice(tasks.findIndex(findID), 1);

  localStorage.setItem('tasks', JSON.stringify(tasks));

  function findID(obj) {
    return obj.id === task.id;
  }
}

function renderTasks(tasks) {
  const taskList = document.getElementById('task-list');
  tasks.forEach(task => {
    addTask(task.desc);
    console.log('ren');
  })
}


function checkStorage() {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    let parsedTasks = JSON.parse(storedTasks);
    renderTasks(parsedTasks);
  }
}

function sortTasks(order) {

}