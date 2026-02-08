import { useState, useEffect } from "react";
import BulkActionsBar from "./BulkActionsBar";
import ListSummaries from "./ListSummaries";
import TaskListBody from "./TaskListBody";
import TaskControls from "./TaskControls";

export default function TasksPage() {

    // State/Effect
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem("tasks");
        return saved ? JSON.parse(saved) : [];
    });
    const [editingId, setEditingId] = useState(null);
    const [viewFilter, setViewFilter] = useState("all");

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    // Helpers
    function normalizeText(text) {
        return (text.trim().toLowerCase())
    }

    // Derived Values
    const hasArchivedTasks =
        tasks.some((item) => item.status === "archived");

    const hasDoneTasks =
        tasks.some((item) => item.status === "done");

    const openCount = tasks.filter((item) => item.status === "open").length;
    const doneCount = tasks.filter((item) => item.status === "done").length;
    const archivedCount = tasks.filter((item) => item.status === "archived").length;
    const isEditingNow = editingId !== null;

    const visibleTasks =
        viewFilter === "all"
            ? tasks
            : tasks.filter((item) => item.status === viewFilter);

            

    // Handlers - Add / Validate
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

    // Edit Flow
    function startEditHandler(id) {
        setEditingId(id);
    }

    function saveEditHandler(id, newTask) {
        const normalized = normalizeText(newTask);
       const currentTask = tasks.find((item) => item.id === id);
        if(normalizeText(currentTask.title) === normalized){
            cancelEditHandler();
            return;
        } 
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

    // Per Item Actions
    function deleteHandler(idToDelete) {
        setTasks((prev) => prev.filter((item) => item.id !== idToDelete));
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

    // Bulk Actions
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
        setEditingId(null);
    }

    function clearArchivedTasksHandler() {
        if (!hasArchivedTasks) return;
        const confirmed = window.confirm(
            "Are you sure you want to delete all archived tasks?"
        );
        if (!confirmed) return;

        setTasks((prev) => prev.filter((item) => item.status !== "archived"));
        setViewFilter("all");
        setEditingId(null);
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
        setEditingId(null);
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
        setEditingId(null);
    }

    // Filter Actions
    function changeFilter(nextFilter) {
        setViewFilter(nextFilter);
        setEditingId(null);
    }

    function handleResetFilter() {
        changeFilter("all");
    }

    // Render
    return (
        <div className="app">
            <div className="card">
                <BulkActionsBar
                    hasArchivedTasks={hasArchivedTasks}
                    hasDoneTasks={hasDoneTasks}
                    viewFilter={viewFilter}
                    editingId={editingId}
                    isEditingNow={isEditingNow}
                    onClearArchived={clearArchivedTasksHandler}
                    onUndoLastArchived={undoLastArchived}
                    onArchiveAllDone={archiveAllDone}
                    onRestoreAllArchived={restoreAllArchived}
                    onResetFilter={handleResetFilter}
                />
                <TaskControls
                    onAddTask={addTaskHandler}
                    viewFilter={viewFilter}
                    onChangeFilter={changeFilter} />
                <ListSummaries
                    visibleCount={visibleTasks.length}
                    totalCount={tasks.length}
                    openCount={openCount}
                    doneCount={doneCount}
                    archivedCount={archivedCount} />
                <TaskListBody
                    visibleTasks={visibleTasks}
                    editingId={editingId}
                    isEditingNow={isEditingNow}
                    onToggleStatus={toggleStatusHandler}
                    onStartEdit={startEditHandler}
                    onDelete={deleteHandler}
                    onCancel={cancelEditHandler}
                    onSave={saveEditHandler} />
            </div>
        </div>
    );
}
