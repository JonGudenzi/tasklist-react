import AddTaskForm from "./AddTaskForm";
import FilterButtons from "./FilterButtons";

export default function TaskControls({
    onAddTask,
    viewFilter,
    onChangeFilter,
    sortOrder,
    onChangeSort,
    visibleCount
}) {
    return (
        <>
            <h2 className="title">Task List</h2>

            <div className="addRow">
                <AddTaskForm
                    onAddTask={onAddTask} />
            </div>

            <div className="filterRow">
                <FilterButtons
                    viewFilter={viewFilter}
                    onChangeFilter={onChangeFilter} />
            </div>

            {viewFilter !== "all" &&
                <button
                    onClick={() => onChangeFilter("all")}>
                    Clear Filter
                </button>}

            <br />
            <br />

            <button
                onClick={() => onChangeSort("newest")}
                disabled={sortOrder === "newest" || visibleCount <= 1}>
                Newest
            </button>
            <button
                onClick={() => onChangeSort("oldest")}
                disabled={sortOrder === "oldest" || visibleCount <= 1}>
                Oldest
            </button>
            <button
                onClick={() => onChangeSort("titleAsc")}
                disabled={sortOrder === "titleAsc" || visibleCount <= 1}>
                A-Z
            </button>
            <button
                onClick={() => onChangeSort("titleDsc")}
                disabled={sortOrder === "titleDsc" || visibleCount <= 1}>
                Z-A
            </button>
        </>
    );
}