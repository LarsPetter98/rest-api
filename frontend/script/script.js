function addTodo() {
  let todoInput = document.getElementById("todoInput");
  let todoList = document.getElementById("todoList");
  let task = todoInput.value;
  if (task.trim() === "") {
    alert("Please enter a task!");
    return;
  }
  let li = document.createElement("li");
  li.textContent = task;
  let optionsSpan = document.createElement("span");
  optionsSpan.innerHTML = "&#8942;";
  optionsSpan.className = "options";
  optionsSpan.onclick = function (event) {
    event.stopPropagation();
    showOptions(event);
  };
  li.appendChild(optionsSpan);
  todoList.appendChild(li);
  todoInput.value = "";

  const content = li.textContent.slice(0, li.textContent.length - 1);
  const postData = {
    content: content,
  };

  const url = "http://localhost:3000";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  };

  fetch(url, options)
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

function showOptions(event) {
  let taskItem = event.target.parentNode;
  let options = document.createElement("div");
  options.className = "task-options";
  let deleteOption = document.createElement("button");
  deleteOption.textContent = "Delete";
  deleteOption.onclick = function () {
    deleteTask(taskItem);
  };
  let editOption = document.createElement("button");
  editOption.textContent = "Edit";
  editOption.onclick = function () {
    editTask(taskItem);
  };
  options.appendChild(deleteOption);
  options.appendChild(editOption);
  taskItem.appendChild(options);
}

function deleteTask(taskElement) {
  taskElement.remove();

  let content = taskElement.textContent;
  content = content.replace(/⋮DeleteEdit$/, "");
  
  const url = "http://localhost:3000";
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ content: content })
  };

  fetch(url, options)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    console.log("DELETE request successful:", data);
  })
  .catch((error) => {
    console.error("There was a problem with the DELETE request:", error);
  });
}

function editTask(taskElement) {
  let newText = prompt("Enter the new task:", taskElement.textContent);
  if (newText !== null) {
    taskElement.textContent = newText;
  }
}

document.addEventListener("click", function (event) {
  let allOptions = document.querySelectorAll(".task-options");
  for (let i = 0; i < allOptions.length; i++) {
    if (!allOptions[i].contains(event.target)) {
      allOptions[i].parentNode.removeChild(allOptions[i]);
    }
  }
});
