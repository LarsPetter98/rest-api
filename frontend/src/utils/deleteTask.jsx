export default function deleteTask(event) {
    //Remove note from noteMananger
    const taskItem = event.currentTarget.parentNode.parentNode;
    const taskItemParent = taskItem.parentNode;
    taskItemParent.removeChild(taskItem);
    const taskText = taskItem.children[0].textContent;

    //Remove note from noteList
    const noteElementId = "note" + taskItem.id;
    const noteElement = document.getElementById(noteElementId);
    const noteElementParent = noteElement.parentNode;
    noteElementParent.removeChild(noteElement);
    
    //Endpoint for delete request
    const url = "http://localhost:3000/api/notes";

    //Options for patch request
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ content: taskText })
    };
  
    //Send delete request to server
    fetch(url, options)
    .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
    })
    .then((data) => {
        console.log("DELETE request successful:", data);
    })
    .catch((error) => {
        console.error("There was a problem with the DELETE request:", error);
    });
  }