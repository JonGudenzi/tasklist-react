export default function StatusSummary({ taskCounts }) {
    return (
        <div className="statusCounts">
            <span>Active: {taskCounts.active}</span> {" | "}
            <span>Open: {taskCounts.open}</span> {" | "}
            <span>Done: {taskCounts.done}</span> {" | "}
            <span>Archived: {taskCounts.archived}</span> {" | "}
        </div>
    )
}