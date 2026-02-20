import { useState } from "react";
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
    const { tasks, setTasks, taskCounts, hasArchivedTasks, hasDoneTasks } = useTasks();

    // Helpers
    function normalizeText(text) {
        return (text.trim().toLowerCase())
    }

    // Derived Values
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

    function archiveAllDone() {
        setTasks((prev) =>
            prev.map((item) => {
                if (item.status === "done") {
                    return { ...item, status: "archived" };
                }
                return item;
            })
        );
        changeFilter("archived");
        cancelEdit();
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
        changeFilter("done");
        cancelEdit();
    }

    // Filter Actions
    function handleFilterChange(nextFilter) {
        changeFilter(nextFilter);
        cancelEdit();
    }

    function handleResetFilter() {
        handleFilterChange("all");
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
                    onChangeFilter={handleFilterChange} />
                <ListSummaries
                    visibleCount={visibleTasks.length}
                    totalCount={tasks.length}
                    taskCounts={taskCounts} />
                <TaskListBody
                    visibleTasks={visibleTasks}
                    editingId={editingId}
                    isEditingNow={isEditingNow}
                    onToggleStatus={toggleStatusHandler}
                    onDelete={deleteHandler}
                    onCancel={cancelEdit}
                    onSave={saveEditHandler} 
                    onStartEdit={startEdit}/>
            </div>
        </div>
    );
}
