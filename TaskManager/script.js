const tasks = [];
const taskManager = document.getElementById('taskmanager');
const taskForm = document.getElementById('managerForm');
let nextId = 1;
let editTaskId = null;

// event listener
taskForm.addEventListener('submit', function(event) {
  event.preventDefault();

// get input values
  const taskItem = document.getElementById('taskItem').value.trim();
  const taskImportance = document.getElementById('taskImportance').value;
  const isImportant = document.getElementById('isImportant').checked;
  const date = new Date().toLocaleDateString();
  const isCompleted = false; 
  
  if (taskItem === "") {
    alert("Please enter a task.");
    return;
  }
// editing the task
  if (editTaskId!== null) {
    const task = tasks.find(t => t.id === editTaskId);
    if (task) {
        task.name = taskItem;
        task.priority = taskImportance;
        task.isImportant = isImportant
    }
    editTaskId = null;
  } else {
// creates a new task value
    const task = {
        id: nextId++, 
        name: taskItem,
        priority: taskImportance,
        isImportant: isImportant,
        isCompleted: isCompleted,
        date: date
    };
    tasks.push(task); // adds a new task to the list
  }


  


  renderTasks();
  console.log(JSON.stringify(tasks)); 
});

function renderTasks() {
  taskManager.innerHTML = ''; 
  
  tasks.forEach(task => {
    const taskManagerDiv = document.createElement('div');
    taskManagerDiv.dataset.id = task.id;
    taskManagerDiv.classList.add('task-item');
    
    const taskText = `${task.name} - Priority: ${task.priority} - ${task.date}`;
    const taskDiv = document.createElement('div');
    taskDiv.textContent = taskText;

// apply important and completed styling
    if (task.isImportant) {
      taskDiv.classList.add('important');
    }

    if (task.isCompleted) {
      taskDiv.classList.add('completed');
    }

// delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener('click', function() {
      deleteTask(task.id);
    });

// edit button
    const editBtn = document.createElement('button');
    editBtn.textContent = "Edit";
    editBtn.addEventListener('click', function() {
        editTask(task.id);
    });

// completed checkbox
    const completeCheckbox = document.createElement('input');
    completeCheckbox.type = 'checkbox';
    completeCheckbox.checked = task.isCompleted;
    const completeLabel = document.createElement('label');
    completeLabel.textContent = "Completed";
    
    completeCheckbox.addEventListener('change', function() {
      toggleComplete(task.id, completeCheckbox.checked);
    });

    taskManagerDiv.appendChild(taskDiv);
    taskManagerDiv.appendChild(completeCheckbox);
    taskManagerDiv.appendChild(completeLabel); 
    taskManagerDiv.appendChild(deleteBtn);
    taskManagerDiv.appendChild(editBtn);

    
    taskManager.appendChild(taskManagerDiv);
  });
}

function deleteTask(id) {
  const taskIndex = tasks.findIndex(task => task.id === id);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1); 
  }
  renderTasks();
}

function editTask(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
      document.getElementById('taskItem').value = task.name;
      document.getElementById('taskImportance').value = task.priority;
      document.getElementById('isImportant').checked = task.isImportant;
      editTaskId = id;
    }
}
  
// can toggle if task is complete or not
function toggleComplete(id, isCompleted) {
  const task = tasks.find(task => task.id === id);
  if (task) {
    task.isCompleted = isCompleted; 
  }
  renderTasks(); 
}
