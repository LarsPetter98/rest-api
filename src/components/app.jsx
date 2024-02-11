export default function App (props) {
    return (
    <div className="container">
        <h1>Todo List</h1>
        <div className="input-group">
            <input id="todoInput" type="text" placeholder="Enter your task" />
            <button id="addButton" onClick={props.addTask}>Add</button>
        </div>
        <ul id="todoList">
        </ul>
    </div>
    )
};