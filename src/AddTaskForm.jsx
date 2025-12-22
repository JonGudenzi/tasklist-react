import { useState } from "react";
export default function AddTaskForm({ onAddTask }) {
  const [inputText, setInputText] = useState("");

  function handleAddClick() {
    const trimmed = inputText.trim();
    if (trimmed === "") return;
    onAddTask(trimmed);
    setInputText("");
  }

  return (
    <div className="addForm">
      <input
        className="textInput"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleAddClick();
        }}
        placeholder="Add a task..."
      />
      <button className="primaryBtn" onClick={handleAddClick}>Add</button>
    </div>
  );

}