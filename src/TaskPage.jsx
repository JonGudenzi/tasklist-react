import { useEffect, useState } from "react";
import BulkActionsBar from "./BulkActionsBar";
import ListSummaries from "./ListSummaries";
import TaskListBody from "./TaskListBody";
import TaskControls from "./TaskControls";
import useViewFilter from "./hooks/useViewFilter";
import useTasks from "./hooks/useTasks";
import useEditing from "./hooks/useEditing";

export default function TasksPage() {

    // State/Effect
    const { editingId, isEditingNow, startEdit, cancelEdit } = useEditing();
    const { viewFilter, changeFilter } = useViewFilter();
    const { tasks, setTasks, taskCounts, toggleStatus, archiveAllDone } = useTasks();
    const [sortOrder, setSortOrder] = useState(() => {
        const savedSortOrder = localStorage.getItem("sortOrder");
        if (!savedSortOrder) {
            return "newest";
        }
        const parsed = JSON.parse(savedSortOrder);

        const sortNames = ["newest", "oldest", "titleAsc", "titleDsc"];
        if (sortNames.includes(parsed)) {
            return parsed
        } return "newest";
    });

    useEffect(() => {
        localStorage.setItem("sortOrder", JSON.stringify(sortOrder));
    }, [sortOrder]);

    // Helpers
    function normalizeText(text) {
        return (text.trim().toLowerCase())
    }

    // Derived Values
    const activeTasks = tasks.filter((item) =>
        item.status !== "archived"
    );

    let visibleTasks;

    if (viewFilter === "all") {
        visibleTasks = tasks;
    } else if (viewFilter === "active") {
        visibleTasks = activeTasks;
    } else {
        visibleTasks = tasks.filter((item) => item.status === viewFilter)};

    const hasArchivedTasks = taskCounts.archived > 0;
    const hasDoneTasks = taskCounts.done > 0;

    const sortedVisibleTasks = [...visibleTasks].sort((a, b) => {
        switch (sortOrder) {
            case "newest":
                return b.id - a.id
            case "oldest":
                return a.id - b.id
            case "titleAsc":
                return a.title.localeCompare(b.title)
            case "titleDsc":
                return b.title.localeCompare(a.title)
            default:
                return 0;
        }
    })

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
    function saveEditHandler(id, newTask) {
        const normalized = normalizeText(newTask);
        const currentTask = tasks.find((item) => item.id === id);
        if (normalizeText(currentTask.title) === normalized) {
            cancelEdit();
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
        cancelEdit();
    }

    // Per Item Actions
    function deleteHandler(idToDelete) {
        setTasks((prev) => prev.filter((item) => item.id !== idToDelete));
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
        cancelEdit();
    }

    function clearArchivedTasksHandler() {
        if (!hasArchivedTasks) return;
        const confirmed = window.confirm(
            "Are you sure you want to delete all archived tasks?"
        );
        if (!confirmed) return;

        setTasks((prev) => prev.filter((item) => item.status !== "archived"));
        changeFilter("all");
        cancelEdit();
    }

    function archiveAll() {
        cancelEdit();
        archiveAllDone();
        changeFilter("archived");
    }

    function restoreAllArchived() {
        cancelEdit();
        setTasks((prev) =>
            prev.map((item) => {
                if (item.status === "archived") {
                    return { ...item, status: "done" };
                }
                return item;
            })
        );
        changeFilter("done");
    }

    // Filter Actions
    function changeFilterAndCancelEdit(nextFilter) {
        changeFilter(nextFilter);
        cancelEdit();
    }

    function resetFilterToAll() {
        changeFilterAndCancelEdit("all");
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
                    onArchiveAllDone={archiveAll}
                    onRestoreAllArchived={restoreAllArchived}
                    onResetFilter={resetFilterToAll}
                />
                <TaskControls
                    onAddTask={addTaskHandler}
                    viewFilter={viewFilter}
                    onChangeFilter={changeFilterAndCancelEdit}
                    sortOrder={sortOrder}
                    onChangeSort={setSortOrder}
                    visibleCount={visibleTasks.length} />
                <ListSummaries
                    visibleCount={visibleTasks.length}
                    totalCount={tasks.length}
                    taskCounts={taskCounts} />
                <TaskListBody
                    visibleTasks={sortedVisibleTasks}
                    editingId={editingId}
                    isEditingNow={isEditingNow}
                    onToggleStatus={toggleStatus}
                    onDelete={deleteHandler}
                    onCancel={cancelEdit}
                    onSave={saveEditHandler}
                    onStartEdit={startEdit} />
            </div>
        </div>
    );
}
