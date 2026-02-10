export default function StatusSummary({ 
    openCount, 
    doneCount, 
    archivedCount, 
    activeTaskCount }) {
    return (
        <div className="statusCounts">
                    <span>Active: {activeTaskCount}</span> {" | "}
                    <span>Open: {openCount}</span> {" | "}
                    <span>Done: {doneCount}</span> {" | "}
                    <span>Archived: {archivedCount}</span> {" | "}
                </div>
    )
}