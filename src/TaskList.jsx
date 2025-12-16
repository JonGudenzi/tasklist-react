import { useState } from "react";
import TaskItem from "./TaskItem";
import FilterButtons from "./FilterButtons";
import TaskSummary from "./TaskSummary";
import AddTaskForm from "./AddTaskForm";

export default function TaskList() {

    const [tasks, setTasks] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [viewFilter, setViewFilter] = useState("all");

    function addTaskHandler(title) {
        const newTitle = { id: Date.now(), title, status: "open" };
        setTasks(prev => ([...prev, newTitle]));
    }

    function deleteHandler(idToDelete) {
        setTasks((prev) => prev.filter((item) => item.id !== idToDelete));
    }

    function startEditHandler(id) {
        setEditingId(id);
    }

    function saveEditHandler(id, newTask) {
        const trimmed = newTask.trim();
        if (trimmed === "") return;

        const updatedList = tasks.map(item => {
            if (item.id === id) {
                return { ...item, title: trimmed }
            }
            return item;
        });
        setTasks(updatedList);
        setEditingId(null);
    }

    function cancelEditHandler() {
        setEditingId(null);
    }

    function toggleStatusHandler(id) {
        setTasks(prev =>
            prev.map(item => {
                if (item.id === id) {
                    return {
                        ...item,
                        status: item.status === "open" ? "closed" : "open"
                    };
                }
                return item;
            })
        );
    }

    function clearClosedTasksHandler() {
        if (!hasClosedTasks) return;
        const confirmed = window.confirm(
            "Are you sure you want to clear all closed tasks?"
        );
        if (!confirmed) return;

        setTasks((prev) => prev.filter((item) => item.status !== "closed"));
        setViewFilter("all");
    }

    const visibleTasks =
        viewFilter === "all"
            ? tasks
            : tasks.filter((item) => item.status === viewFilter);

    const hasClosedTasks =
        tasks.some((item) => item.status === "closed");

    return (
        <div className="app">
            <div className="card">
                <div className="topRow">
                    <button
                        className="dangerBtn"
                        onClick={clearClosedTasksHandler}
                        disabled={!hasClosedTasks}
                    >
                        Clear all closed tasks
                    </button>
                </div>

                <h2 className="title">Task List</h2>

                <div className="addRow">
                    <AddTaskForm onAddTask={addTaskHandler} />
                </div>

                <div className="filterRow">
                    <FilterButtons viewFilter={viewFilter} setViewFilter={setViewFilter} />
                </div>

                <TaskSummary
                    visibleCount={visibleTasks.length}
                    totalCount={tasks.length}
                />

                <div className="list">
                    {visibleTasks.length === 0 ? (
                        <p className="muted">No tasks yet</p>
                    ) : (
                        visibleTasks.map((item) => {
                            const disableEdit = editingId !== null && editingId !== item.id;
                            return (<TaskItem
                                key={item.id}
                                task={item.title}
                                status={item.status}
                                onToggleStatus={() => toggleStatusHandler(item.id)}
                                onStartEdit={() => startEditHandler(item.id)}
                                onDelete={() => deleteHandler(item.id)}
                                isEditing={item.id === editingId}
                                onCancel={cancelEditHandler}
                                onSave={(newTask) => saveEditHandler(item.id, newTask)}
                                disableEdit={disableEdit}
                            />)
                            
                        })
                    )}
                </div>
            </div>
        </div>
    );

}
