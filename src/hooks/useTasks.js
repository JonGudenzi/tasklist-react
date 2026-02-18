import { useState, useEffect } from "react";

export default function useTasks() {
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem("tasks");
        return saved ? JSON.parse(saved) : [];
    });

    const taskCounts = tasks.reduce((totals, item) => {
        if (item.status === "open") {
            totals.open++;
        } else if (item.status === "done") {
            totals.done++;
        } else if (item.status === "archived") {
            totals.archived++;
        }
        return totals;
    }, { open: 0, done: 0, archived: 0 })
    const active = taskCounts.active = taskCounts.open + taskCounts.done;
   
    const hasArchivedTasks = taskCounts.archived > 0;
    const hasDoneTasks = taskCounts.done > 0;

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    return {
        tasks,
        setTasks,
        taskCounts,
        active,
        hasArchivedTasks,
        hasDoneTasks
    };
}