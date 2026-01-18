import { useState } from "react";
import TaskList from "./TaskList";

export default function App() {

  const [viewList, setViewList] = useState(true);

  function hideViewList() {
    setViewList((prev) => {
     return !prev;
    });
  }

  return (
    <div>
      <h1>Task List</h1>
      <button onClick={hideViewList}>{viewList ? "Hide task list" : "Show task list"}</button>
      {
        viewList && <TaskList />
      }
      
    </div>
  );
}
