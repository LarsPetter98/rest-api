import showOptions from "./showOptions.jsx";

export default function addTask() {
    const todoInput = document.getElementById("todoInput");
    const todoList = document.getElementById("todoList");
  
    let taskText = todoInput.value;
    let newTask = /*html*/ `
    <li class="taskItem">
        ${taskText}
        <span class="options">&#8942</span>
        <div class="task-options hide">
            <button onclick="editTask()">Edit</button>
            <button onclick="deleteTask()">Delete</button>
        </div>
    </li>
    `;
    todoList.innerHTML += newTask;
    const options = document.querySelectorAll(".options");
    options.forEach(option => option.onclick = showOptions)
  
    const content = taskText.slice(0, taskText.length - 1);
    const postData = {
      content: content,
    };
    const url = "http://localhost:3000";
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