const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
renderTasks();

addBtn.addEventListener('click', addTask);

function addTask() {
  const text = taskInput.value.trim();
  if (text === "") {
    alert("Please enter a task.");
    return;
  }
  tasks.push({ id: Date.now(), text, completed: false });
  updateStorage();
  taskInput.value = "";
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach(({ id, text, completed }) => {
    const li = document.createElement('li');
    if (completed) li.classList.add('completed');
    
    // Checkbox for completed
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;
    checkbox.addEventListener('change', () => {
      toggleComplete(id);
    });
    li.appendChild(checkbox);

    // Task text
    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = text;
    li.appendChild(span);

    // Edit button
    const editBtn = document.createElement('button');
    editBtn.className = 'edit';
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => editTask(id, span));
    li.appendChild(editBtn);

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteTask(id));
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });
}

function toggleComplete(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  updateStorage();
  renderTasks();
}

function editTask(id, spanElem) {
  const newText = prompt("Edit your task", spanElem.textContent);
  if (newText !== null && newText.trim() !== "") {
    tasks = tasks.map(task =>
      task.id === id ? { ...task, text: newText.trim() } : task
    );
    updateStorage();
    renderTasks();
  }
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  updateStorage();
  renderTasks();
}

function updateStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
