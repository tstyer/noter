import React from "react";

// Takes in the note and onDelete only
function Note({ note, onDelete }) {
    // This will only tell us what the date was when created. 
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-UK")

    return (
        // Rendering the container, in that we have the P's.
        <div className="note-container">
            <p className="note-title">{note.title}</p>
            <p className="note-content">{note.content}</p>
            <p className="note-date">{formattedDate}</p>
            <button className="delete-button" onClick={() => onDelete(note.id)}>
                Delete
            </button>
        </div>
    );
}


export default Note