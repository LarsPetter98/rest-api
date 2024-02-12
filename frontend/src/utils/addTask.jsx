import showOptions from "./showOptions.jsx";
import editTask from "./editTask.jsx";
import deleteTask from "./deleteTask.jsx";
import loadTask from "./loadTask.jsx";

export default function AddTask() {
    const todoInput = document.getElementById("todoInput");
    const todoList = document.getElementById("todoList");
    const notesList = document.querySelector(".notes");
    const noteElements = document.querySelectorAll(".note-element");
  
    let taskText = todoInput.value;
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
    console.log(noteElements.length);
    if(taskText != "") todoList.innerHTML = newTask;
    const options = document.querySelectorAll(".options");
    options.forEach(option => option.onclick = showOptions)
    document.querySelector(".edit-task-btn").onclick = editTask;
    document.querySelector(".delete-task-btn").onclick = deleteTask;

    if(noteElements.length < 9) {
      notesList.innerHTML += /*html*/
      `
      <div class="note-element"><span class="note-element-text">${taskText}</span></div>
      `
      document.querySelector(".note-element").onclick = loadTask;
    }
    else alert("Can't store anymore notes, please delete one to make room");
  
    const postData = {
      content: taskText,
    };
    const url = "http://localhost:3000/api/notes";
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    };
  
    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("POST request successful:", data);
      })
      .catch((error) => {
        console.error("There was a problem with the POST request:", error);
      });
}