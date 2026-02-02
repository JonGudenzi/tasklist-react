import { useEffect, useState, useRef } from "react";

export default function TaskItem({ task, onDelete, onStartEdit, isEditing, onSave, onCancel, status, onToggleStatus, disableEdit, isLocked }) {

  const [editText, setEditText] = useState(task);

  useEffect(() => {
    if (isEditing) {
      setEditText(task);
    }
  }, [isEditing, task]);

  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.select()
    }
  }, [isEditing]);

  let toggleLabel;

if (status === "open") {
  toggleLabel = "Mark Done";
} else if (status === "done") {
  toggleLabel = "Archive";
} else {
  toggleLabel = "Reopen";
}

function handleEditKeyDown(e) {
  if (e.key === "Enter") {
    onSave(editText);
  } if (e.key === "Escape") {
    onCancel();
  }
}

return (
  <div className="taskRow">
    {!isEditing ? (
      <>
        <div className="taskText">
          <span className="taskTitle">{task}</span>
          <span className={`pill ${status}`}>{status}</span>
        </div>
        <div className="actions">
          <button className="btn" 
          disabled={isLocked}
          onClick={onToggleStatus}>
            {toggleLabel}
          </button>

          <button
            className="btn"
            onClick={onStartEdit}
            disabled={disableEdit}
          >
            Edit
          </button>

          <button className="btn danger" 
          onClick={onDelete}
          disabled={isLocked}>
            Delete
          </button>
        </div>
      </>
    ) : (
      <>
        <input
          className="textInput"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleEditKeyDown}
          ref={inputRef}
        />

        <div className="actions">
          <button className="btn" onClick={() => onSave(editText)}>
            Save
          </button>

          <button
            className="btn"
            onClick={() => {
              setEditText(task);
              onCancel();
            }}
          >
            Cancel
          </button>
        </div>
      </>
    )}
  </div>
);

}
