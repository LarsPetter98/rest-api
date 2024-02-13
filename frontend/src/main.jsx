//Imports
import React from "react";
import ReactDOM from 'react-dom/client';
import NoteManager from "./components/noteManager.jsx"
import NoteList from "./components/noteList.jsx";
import "../public/css/styles.css";

function RenderPage () {
    return (
        <div className="flex-box">
            <NoteList></NoteList>
            <NoteManager></NoteManager>
        </div>
    )
};

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <RenderPage />
    </React.StrictMode>,
)