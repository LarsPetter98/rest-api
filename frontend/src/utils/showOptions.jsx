export default function showOptions (event) {
    //Dom elements
    const todoList = event.currentTarget.parentNode;
    const taskOptions = todoList.children[todoList.children.length - 1];

    //Show and hide edit and delete button on noteManager
    taskOptions.classList.toggle("hide");
};