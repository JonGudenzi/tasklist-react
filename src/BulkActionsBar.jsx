
export default function BulkActionsBar({
    hasArchivedTasks,
    hasDoneTasks,
    viewFilter,
    onClearArchived,
    onUndoLastArchived,
    onArchiveAllDone,
    onRestoreAllArchived,
    onResetFilter,
    isEditingNow
}) {
return(
    <div className="topRow">
                    <button
                        className="dangerBtn"
                        onClick={onClearArchived}
                        disabled={!hasArchivedTasks || isEditingNow} >Clear Archived</button>
                    <button
                        className="dangerBtn"
                        onClick={onUndoLastArchived}
                        disabled={!hasArchivedTasks || isEditingNow} >Undo Last Archived</button>
                    <button
                        className="dangerBtn"
                        disabled={!hasDoneTasks || isEditingNow}
                        onClick={onArchiveAllDone}>Archive All Done</button>
                    <button
                        className="dangerBtn"
                        disabled={!hasArchivedTasks || isEditingNow}
                        onClick={onRestoreAllArchived}>Restore All Archived</button>
                        <button
                        className="dangerBtn"
                        disabled={viewFilter==="all"}
                        onClick={onResetFilter}>Reset Filter</button>
                </div>
)
}