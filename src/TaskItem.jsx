import { useEffect, useState } from "react";

export default function TaskItem({ task, onDelete, onStartEdit, isEditing, onSave, onCancel, status, onToggleStatus, disableEdit }) {

    const [editText, setEditText] = useState(task);

    useEffect(() => {
        if (isEditing) {
            setEditText(task);
        }
    }, [isEditing, task]);

    const toggleLabel = status === "open" ? "Close" : "Reopen";

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
          <button className="btn" onClick={onToggleStatus}>
            {toggleLabel}
          </button>

          <button
            className="btn"
            onClick={onStartEdit}
            disabled={disableEdit}
          >
            Edit
          </button>

          <button className="btn danger" onClick={onDelete}>
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
