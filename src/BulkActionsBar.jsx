
export default function BulkActionsBar({
    hasArchivedTasks,
    hasDoneTasks,
    viewFilter,
    editingId,
    onClearArchived,
    onUndoLastArchived,
    onArchiveAllDone,
    onRestoreAllArchived,
    onResetFilter,
}) {
return(
    <div className="topRow">
                    <button
                        className="dangerBtn"
                        onClick={onClearArchived}
                        disabled={!hasArchivedTasks} >Clear Archived</button>
                    <button
                        className="dangerBtn"
                        onClick={onUndoLastArchived}
                        disabled={!hasArchivedTasks} >Undo Last Archived</button>
                    <button
                        className="dangerBtn"
                        disabled={!hasDoneTasks}
                        onClick={onArchiveAllDone}>Archive All Done</button>
                    <button
                        className="dangerBtn"
                        disabled={!hasArchivedTasks}
                        onClick={onRestoreAllArchived}>Restore All Archived</button>
                        <button
                        className="dangerBtn"
                        disabled={viewFilter==="all" && editingId === null}
                        onClick={onResetFilter}>Reset Filter</button>
                </div>
)
}