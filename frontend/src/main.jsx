import React from "react";
import ReactDOM from 'react-dom/client';
import App from "./components/app.jsx"
import addTask from "./utils/addTask.jsx";
import "../public/css/styles.css";

function RenderPage () {
    return (
        <div>
            <App addTask={addTask}></App>
        </div>
    )
};

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <RenderPage />
    </React.StrictMode>,
)