export default function editTask() {
    //Edit note on the webpage
    const taskItem = document.querySelector(".task-text");
    const oldContent = taskItem.textContent;
    let newText = prompt("Enter the new task:", taskItem.textContent);
    if (newText !== null) {
        taskItem.textContent = newText;
    }

    //Endpoint for patch request
    const url = "http://localhost:3000/api/notes";

    //Options for patch request
    const options = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
            oldContent: oldContent, //Original content
            newContent: newText //New content
        })
      };

      //Send patch request to server to save changes in the db
      fetch(url, options)
      .then((response) => {
          if (!response.ok) throw new Error("Network response was not ok");
          return response.json();
      })
      .then((data) => {
          console.log("PATCH request successful:", data);
      })
      .catch((error) => {
          console.error("There was a problem with the PATCH request:", error);
      });
}