import AddTaskForm from "./AddTaskForm";
import FilterButtons from "./FilterButtons";

export default function TaskControls({
    onAddTask,
    viewFilter,
    onChangeFilter,
}) {
    return (
        <>
            <h2 className="title">Task List</h2>

            <div className="addRow">
                <AddTaskForm onAddTask={onAddTask} />
            </div>

            <div className="filterRow">
                <FilterButtons viewFilter={viewFilter}
                    onChangeFilter={onChangeFilter} />
            </div>
        </>

    );
}