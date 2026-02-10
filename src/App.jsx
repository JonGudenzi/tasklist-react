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

// const numbers = [1, 2, 3, 4, 5, 6];

// function firstEvenNumber(numbers) {
// return numbers.find((item) => {
//   return item % 2 === 0
//   });
// }

// console.log(firstEvenNumber(numbers));


// const numbers = [1, 2, 3, 4, 5, 6];

// function allOddNums(numbers) {
//   return numbers.filter((item) => {
//     return item % 2 === 1
//   });
// }

// console.log(allOddNums(numbers));

// const numbers = [1, 2, 3, 4, 15, 11];

// function totalGreaterThanTen(numbers) {
//   return numbers.reduce((num, item) => {
//     if (item > 10) {
//       return num + item;
//     }
//       return num;
//   }, 0);
// }

// console.log(totalGreaterThanTen(numbers));

// const nums = [1,2,3,4,5,6,7,8,9];

// function sumAllNums(nums) {
//   return nums.reduce((total, item) => {
//    return (total + item);
//   },0);
// }

// console.log(sumAllNums(nums));