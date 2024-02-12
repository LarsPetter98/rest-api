export default function deleteTask(event) {
    const taskItem = event.currentTarget.parentNode.parentNode;
    const taskItemParent = taskItem.parentNode;
    taskItemParent.removeChild(taskItem);
    const taskText = taskItem.children[0].textContent;
    
    const url = "http://localhost:3000/api/notes";
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ content: taskText })
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