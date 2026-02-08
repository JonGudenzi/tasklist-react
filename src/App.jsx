import { useState } from "react";
import TaskList from "./TaskPage";

export default function App() {

  const [viewList, setViewList] = useState(true);

  function hideViewList() {
    setViewList((prev) => {
     return !prev;
    });
  }

  return (
    <div>
      <button onClick={hideViewList}>{viewList ? "Hide task list" : "Show task list"}</button>
      {
        viewList && <TaskList />
      }
      
    </div>
  );
}



// const tasks = [
//   { id: 1, title: "walk the dog"},
//   { id: 2, title: "feed the dog"},
//   { id: 3, title: "wash the dog"}
// ]

// function selectTask(tasks, id) {
//  return tasks.find((item) => {
//   if(item.id === id){
//     return item;
//   }
//  });
// }

// selectTask(tasks, 2);

// console.log(selectTask(tasks, 2));