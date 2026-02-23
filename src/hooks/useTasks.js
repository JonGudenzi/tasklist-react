import { useState, useEffect } from "react";
import getNextStatus from "./useTaskStatus";

export default function useTasks() {
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem("tasks");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

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
    taskCounts.active = taskCounts.open + taskCounts.done;

    const hasArchivedTasks = taskCounts.archived > 0;
    const hasDoneTasks = taskCounts.done > 0;

    function toggleStatus(id) {
        setTasks(prev =>
            prev.map(item => {
                if (item.id === id) {
                    const nextStatus = getNextStatus(item.status);
                    return { ...item, status: nextStatus };
                }
                return item;
            })
        );
    }

    function archiveAllDone() {
        setTasks((prev) =>
            prev.map((item) => {
                if (item.status === "done") {
                    return { ...item, status: "archived" };
                }
                return item;
            })
        );
    }

    return {
        tasks,
        setTasks,
        taskCounts,
        hasArchivedTasks,
        hasDoneTasks,
        toggleStatus,
        archiveAllDone
    };
}