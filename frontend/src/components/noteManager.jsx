//Imports
import AddTask from "../utils/addTask.jsx"

export default function NoteManager () {
    return (
    <div className="noteManager">
        <div className="container">
            <h1 className="heading">Todo List</h1>
            <div className="input-group">
                <input id="todoInput" type="text" placeholder="Skriv oppgave" />
                <button id="addButton" onClick={AddTask}>Add</button>
            </div>
            <div id="todoList"></div>
        </div>
    </div>
    )
};