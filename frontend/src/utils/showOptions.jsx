export default function showOptions (event) {
    const todoList = event.currentTarget.parentNode;
    const taskOptions = todoList.children[todoList.children.length - 1];
    taskOptions.classList.toggle("hide");
};