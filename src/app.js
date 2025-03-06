// Onload listeners
document.addEventListener('DOMContentLoaded', () => {
  renderRoot();
  checkStorage();
});

function renderRoot() {
  ///////////////////////////
  // Initialize elements //
  ///////////////////////////

  // Main container
  let toDoList = document.createElement('div');
  toDoList.classList.add('to-do-list');

  // Input elements //
  ////////////////////

  // Task Input
  let taskInput = document.createElement('div');
  taskInput.classList.add('task-input');

  // Input Field
  let inputField = document.createElement('input');
  inputField.classList.add('input-field');
  inputField.setAttribute('id', 'input');
  inputField.setAttribute('type', 'text');
  inputField.setAttribute('placeholder', 'Title...');

  // Input Button
  let inputButton = document.createElement('button');
  inputButton.textContent = 'Add';
  inputButton.classList.add('input-button');
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

  // Task List //
  ///////////////

  // Tasks container
  let tasksContainer = document.createElement('div');
  tasksContainer.classList.add('tasks-container');

  // Task list itself
  let taskList = document.createElement('ul');
  taskList.classList.add('task-list');
  taskList.setAttribute('id', 'task-list');

  // Sort-elements //
  ///////////////////

  // Buttons' container
  let taskSortButtons = document.createElement('div');
  taskSortButtons.classList.add('task-sort-buttons');

  // Sort Button for newest sort
  let sortButtonNew = document.createElement('button');
  sortButtonNew.textContent = 'Newest';
  sortButtonNew.classList.add('sort-button');
  sortButtonNew.setAttribute('id', 'sort-button-new');
  sortButtonNew.addEventListener('click', function() { sortTasks('new')});

  // Sort Button for oldest sort
  let sortButtonOld = document.createElement('button');
  sortButtonOld.textContent = 'Oldest';
  sortButtonOld.classList.add('sort-button');
  sortButtonOld.setAttribute('id', 'sort-button-old');
  sortButtonOld.addEventListener('click', function() { sortTasks('old')});

  ////////////////////////
  // Compose elements //
  ////////////////////////

  // Input
  taskInput.appendChild(inputField);
  taskInput.appendChild(inputButton)

  // Task-list
  tasksContainer.appendChild(taskList);

  // Sort section
  taskSortButtons.appendChild(sortButtonNew);
  taskSortButtons.appendChild(sortButtonOld);

  // To-Do list
  toDoList.appendChild(taskInput);
  toDoList.appendChild(tasksContainer);
  toDoList.appendChild(taskSortButtons);

  // Whole document
  document.getElementById('app').appendChild(toDoList);
  createSun(); // Adding sun on the page
}
function addTask(desc) {
  // Create HTML-Element
  const task = createTask(desc)['task'];
  // Set unique ID
  task.setAttribute('id', Date.now());

  // Update localStorage
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push({'id': task['id'], 'desc': desc.toString(), 'createdAt': new Date().toISOString()});
  localStorage.setItem('tasks', JSON.stringify(tasks));
  
  // Render element in HTML
  renderTask(task);
}
function createTask(desc) {
  // List-container for task
  let task = document.createElement('li');
  task.classList.add('task');

  // Span with desctiption of task
  let description = document.createElement('span');
  description.classList.add('description');
  description.textContent = desc;
  
  // Button to delete task
  let removeButton = document.createElement('button');
  removeButton.classList.add('remove-button');
  removeButton.textContent = 'X';
  removeButton.addEventListener('click', function () { 
    removeTask(this) 
  });

  // Compose task
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
  // Get task via remove-button appended to task
  const task = button.parentElement;
  document.getElementById('task-list').removeChild(task);

  // Update localStorage
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const updatedTasks = tasks.filter(obj => obj.id !== task.id);
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}
function renderTasks(tasks) {
  const taskList = document.getElementById('task-list');
  // Create HTML-Elements with tasks from localStorage
  tasks.forEach(task => {
    const currentTask = createTask(task['desc']);
    currentTask['task'].setAttribute('id', task.id);
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
    ? new Date(b.createdAt) - new Date(a.createdAt) // Sort by newest
    : new Date(a.createdAt) - new Date(b.createdAt) // Sort by oldest
  });

  // Save in localStorage to make list stay sorted after page reloading
  localStorage.setItem('tasks', JSON.stringify(tasks));

  taskList.innerHTML = '';
  renderTasks(tasks);
}
function createSun() {
  // This function behaves similarly to a React component, creating and appending elements to the DOM.

  let Sun = document.createElement('div');
  let jsLogo = document.createElement('img');
  let aureole = document.createElement('img');

  jsLogo.src = 'images/JS-logo.png';
  aureole.src = 'images/aureole.png';

  Sun.classList.add('the-sun');
  jsLogo.classList.add('js-logo');
  aureole.classList.add('aureole');

  Sun.appendChild(aureole);
  document.getElementById('app').appendChild(jsLogo);
  document.getElementById('app').appendChild(Sun);
  // It's just nice)
}