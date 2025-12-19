export default function StatusSummary({ openCount, doneCount, archivedCount }) {
    return (
        <div className="statusCounts">
                    <span>Open: {openCount}</span> {" | "}
                    <span>Done: {doneCount}</span> {" | "}
                    <span>Archived: {archivedCount}</span> {" | "}
                </div>
    )
}