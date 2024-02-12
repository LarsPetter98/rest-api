import showOptions from "./showOptions.jsx";
import editTask from "./editTask.jsx";
import deleteTask from "./deleteTask.jsx";

export default function loadTask (event) {
    const noteElements = document.querySelectorAll(".note-element");
    const todoList = document.getElementById("todoList");
    const noteElement = event.currentTarget;
  
    let taskText = noteElement.textContent;
    let newTask = /*html*/ `
    <div class="taskItem">
        <span class="task-text">${taskText}</span>
        <span class="options">&#8942</span>
        <div class="task-options hide">
            <button class="edit-task-btn">Edit</button>
            <button class="delete-task-btn">Delete</button>
        </div>
    </div>
    `;

    if(taskText != "") todoList.innerHTML = newTask;
    const options = document.querySelectorAll(".options");
    options.forEach(option => option.onclick = showOptions)
    document.querySelector(".edit-task-btn").onclick = editTask;
    document.querySelector(".delete-task-btn").onclick = deleteTask;

    noteElements.forEach(noteElement => noteElement.onclick = loadTask)
};