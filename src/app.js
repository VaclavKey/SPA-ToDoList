// Onload listeners
document.addEventListener('DOMContentLoaded', () => {
  renderRoot();
  checkStorage();
});

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
    // Getting input-field via siblings of button
    const inputField = this.previousElementSibling;
    // Deleting outer spaces
    const input = inputField.value.trim();

    if (!input) return;
    
    addTask(input);
    
    // Clear input-field after adding task
    inputField.value = '';
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
  // Composing elements //
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
  document.getElementById('app').appendChild(toDoList);
}
function addTask(desc) {
  // Creating HTML-Element
  const task = createTask(desc)['task'];
  // Setting unique ID
  task.setAttribute('id', Date.now());

  // Updating localStorage
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push({'id': task['id'], 'desc': desc.toString(), 'createdAt': new Date().toISOString()});
  localStorage.setItem('tasks', JSON.stringify(tasks));
  
  // Rendering element in HTML
  renderTask(task);
}
function createTask(desc) {
  // Creating list-container for task
  let task = document.createElement('li');
  task.classList.add('task');

  // Creating span with desctiption of task
  let description = document.createElement('span');
  description.classList.add('description');
  description.textContent = desc;
  
  // Creating button to delete task
  let removeButton = document.createElement('button');
  removeButton.classList.add('remove-button');
  removeButton.addEventListener('click', function () { 
    removeTask(this) 
  });

  // Composing task
  task.appendChild(description);
  task.appendChild(removeButton);

  return {
    'task': task,
    'desc': desc.toString()
  };
}
function renderTask(task) {
  document.getElementById('task-list').appendChild(task);
}
function removeTask(button) {
  // Getting task via remove-button appended to task
  const task = button.parentElement;
  document.getElementById('task-list').removeChild(task);

  // Updating localStorage
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const updatedTasks = tasks.filter(obj => obj.id !== task.id);
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}
function renderTasks(tasks) {
  const taskList = document.getElementById('task-list');
  tasks.forEach(task => {
    // Creating HTML-Element with localStoraged task
    const currentTask = createTask(task['desc']);
    // Setting ID. Also from localStorage
    currentTask['task'].setAttribute('id', task.id);
    // Appending composed task to task-list
    renderTask(currentTask['task']);
  })
}
function checkStorage() {
  const storedTasks = localStorage.getItem('tasks');
  // If localStorage isn't empty - render tasks from it
  if (storedTasks) {
    let parsedTasks = JSON.parse(storedTasks);
    renderTasks(parsedTasks);
  }
}
function sortTasks(order) {
  const taskList = document.getElementById('task-list');
  const tasks = JSON.parse(localStorage.getItem('tasks'));

  tasks.sort((a, b) => {
    return order === 'new'
    ? new Date(b.createdAt) - new Date(a.createdAt) // Sorting by newest
    : new Date(a.createdAt) - new Date(b.createdAt) // Sorting by oldest
  });

  // Saving in localStorage to make list stay sorted after page reloading
  localStorage.setItem('tasks', JSON.stringify(tasks));

  taskList.innerHTML = '';
  renderTasks(tasks);
}