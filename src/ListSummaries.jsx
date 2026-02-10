import TaskSummary from "./TaskSummary";
import StatusSummary from "./StatusSummary";

export default function ListSummaries({
    visibleCount,
    totalCount,
    taskCounts
}) {
    return (
        <>
            <TaskSummary
                visibleCount={visibleCount}
                totalCount={totalCount}
                />

                {totalCount > 0 && (
                    <StatusSummary 
                    taskCounts={taskCounts}
                    />
                )}
        </>
    );
}