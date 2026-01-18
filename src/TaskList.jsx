import { useState, useEffect } from "react";
import TaskItem from "./TaskItem";
import FilterButtons from "./FilterButtons";
import TaskSummary from "./TaskSummary";
import AddTaskForm from "./AddTaskForm";
import StatusSummary from "./StatusSummary";
import BulkActionsBar from "./BulkActionsBar";

export default function TaskList() {

    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem("tasks");
        return saved ? JSON.parse(saved) : [];
    });
    const [editingId, setEditingId] = useState(null);
    const [viewFilter, setViewFilter] = useState("all");

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    function normalizeText(text) {
        return (text.trim().toLowerCase())
    }

    function addTaskHandler(title) {
        const normalized = normalizeText(title);

        if (normalized === "") return;
        const isDuplicate = tasks.some((item) => (
            normalizeText(item.title) === normalized
        ));

        if (isDuplicate) {
            window.alert("This item already exsists");
            return;
        }

        const newTitle = { id: Date.now(), title: normalized, status: "open" };
        setTasks(prev => ([...prev, newTitle]));
    }

    function deleteHandler(idToDelete) {
        setTasks((prev) => prev.filter((item) => item.id !== idToDelete));
    }

    function startEditHandler(id) {
        setEditingId(id);
    }

    function saveEditHandler(id, newTask) {
        const normalized = normalizeText(newTask);
        if (normalized === "") return;
        const isDuplicate = tasks.some((item) => (
            normalizeText(item.title) === normalized && item.id !== id
        ));

        if (isDuplicate) {
            window.alert("This item already exsists");
            return;
        }
        setTasks(prev => prev.map(item => {
            if (item.id === id) {
                return { ...item, title: normalized }
            }
            return item;
        }));
        setEditingId(null);
    }

    function cancelEditHandler() {
        setEditingId(null);
    }

    function toggleStatusHandler(id) {
        setTasks(prev =>
            prev.map(item => {
                if (item.id === id) {
                    let nextStatus;

                    if (item.status === "open") {
                        nextStatus = "done";
                    } else if (item.status === "done") {
                        nextStatus = "archived";
                    } else {
                        nextStatus = "open";
                    }
                    return { ...item, status: nextStatus };
                }
                return item;
            })
        );
    }

    const hasArchivedTasks =
        tasks.some((item) => item.status === "archived");

    const hasDoneTasks =
        tasks.some((item) => item.status === "done");

    function undoLastArchived() {
        setTasks((prev) => {
            const lastArchivedTask =
                prev.filter((item) => item.status === "archived")
                    .sort((a, b) => b.id - a.id)[0];

            if (!lastArchivedTask) return prev;

            return prev.map((item) => {
                if (item.id === lastArchivedTask.id) {
                    return { ...item, status: "done" };
                }
                return item;
            });
        });
    }

    const openCount = tasks.filter((item) => item.status === "open").length;
    const doneCount = tasks.filter((item) => item.status === "done").length;
    const archivedCount = tasks.filter((item) => item.status === "archived").length;

    function clearArchivedTasksHandler() {
        if (!hasArchivedTasks) return;
        const confirmed = window.confirm(
            "Are you sure you want to delete all archived tasks?"
        );
        if (!confirmed) return;

        setTasks((prev) => prev.filter((item) => item.status !== "archived"));
        setViewFilter("all");
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
        setViewFilter("archived");
    }

    function restoreAllArchived() {
        setTasks((prev) =>
            prev.map((item) => {
                if (item.status === "archived") {
                    return { ...item, status: "done" };
                }
                return item;
            })
        );
        setViewFilter("done");
    }

    function changeFilter(nextFilter) {
        setViewFilter(nextFilter);
        setEditingId(null);
    }

    function handleResetFilter() {
        changeFilter("all");
    }

    const visibleTasks =
        viewFilter === "all"
            ? tasks
            : tasks.filter((item) => item.status === viewFilter);

    return (
        <div className="app">
            <div className="card">

                <BulkActionsBar
                    hasArchivedTasks={hasArchivedTasks}
                    hasDoneTasks={hasDoneTasks}
                    viewFilter={viewFilter}
                    editingId={editingId}
                    onClearArchived={clearArchivedTasksHandler}
                    onUndoLastArchived={undoLastArchived}
                    onArchiveAllDone={archiveAllDone}
                    onRestoreAllArchived={restoreAllArchived}
                    onResetFilter={handleResetFilter}
                />

                <h2 className="title">Task List</h2>

                <div className="addRow">
                    <AddTaskForm onAddTask={addTaskHandler} />
                </div>

                <div className="filterRow">
                    <FilterButtons viewFilter={viewFilter}
                        onChangeFilter={changeFilter} />
                </div>

                <TaskSummary
                    visibleCount={visibleTasks.length}
                    totalCount={tasks.length}
                />
                {tasks.length > 0 && (
                    <StatusSummary
                        openCount={openCount}
                        doneCount={doneCount}
                        archivedCount={archivedCount} />
                )}

                <div className="list">
                    {visibleTasks.length === 0 ? (
                        <p className="muted">No tasks yet</p>
                    ) : (
                        visibleTasks.map((item) => {
                            const disableEdit = editingId !== null && editingId !== item.id;
                            const isEditing = item.id === editingId;
                            return (<TaskItem
                                key={item.id}
                                task={item.title}
                                status={item.status}
                                onToggleStatus={() => toggleStatusHandler(item.id)}
                                onStartEdit={() => startEditHandler(item.id)}
                                onDelete={() => deleteHandler(item.id)}
                                isEditing={isEditing}
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
