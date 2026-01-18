import TaskSummary from "./TaskSummary";
import StatusSummary from "./StatusSummary";

export default function ListSummaries({
    visibleCount,
    totalCount,
    openCount,
    doneCount,
    archivedCount,
}) {
    return (
        <>
            <TaskSummary
                visibleCount={visibleCount}
                totalCount={totalCount} />

                {totalCount > 0 && (
                    <StatusSummary 
                    openCount={openCount}
                    doneCount={doneCount}
                    archivedCount={archivedCount}
                    />
                )}
        </>
    );
}