//Imports
import showOptions from "./showOptions.jsx";
import editTask from "./editTask.jsx";
import deleteTask from "./deleteTask.jsx";

export default function loadTask (event) {
    //Dom elements
    const noteElements = document.querySelectorAll(".note-element");
    const todoList = document.getElementById("todoList");
    const noteElement = event.currentTarget;

    //The text of the selected note
    let taskText = noteElement.textContent;

    //Endpoint for get request with taskText as query parameter
    const url = `http://localhost:3000/api/notes?content=${encodeURIComponent(taskText)}`;

    //Options for get request
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "text/plain"
        },
    };

    //Send get request to server to save changes in the db
    let loadedTaskText = "";
    fetch(url, requestOptions)
    .then(response => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.text();
    })
    .then(data => {
        loadedTaskText = data;
        console.log("GET request successful:", data);
    })
    .catch(error => {
      console.error("There was a problem with the GET request:", error);
    });

    //Load task to noteManager
    let newTask = /*html*/ `
    <div class="taskItem">
        <span class="task-text">${loadedTaskText}</span>
        <span class="options">&#8942</span>
        <div class="task-options hide">
            <button class="edit-task-btn">Edit</button>
            <button class="delete-task-btn">Delete</button>
        </div>
    </div>
    `;
    if(taskText != "") todoList.innerHTML = newTask;

    //Add onclick events to the buttons on the noteManager
    const options = document.querySelectorAll(".options");
    options.forEach(option => option.onclick = showOptions)
    document.querySelector(".edit-task-btn").onclick = editTask;
    document.querySelector(".delete-task-btn").onclick = deleteTask;

    //Add onclick event to each note on the noteList
    noteElements.forEach(noteElement => noteElement.onclick = loadTask)
};