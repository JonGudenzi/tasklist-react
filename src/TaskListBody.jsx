import TaskItem from "./TaskItem";

export default function TaskListBody({
    visibleTasks,
    editingId,
    onToggleStatus,
    onStartEdit,
    onDelete,
    onCancel,
    onSave,
}) {
    return (
        <div className="list">
            {visibleTasks.length === 0 ? (
                <p className="muted">No tasks yet</p>
            ) : (
                visibleTasks.map((item) => {
                    const disableEdit = editingId !== null && editingId !== item.id;
                    const isEditing = item.id === editingId;
                    return <TaskItem
                        key={item.id}
                        task={item.title}
                        status={item.status}
                        onToggleStatus={() => onToggleStatus(item.id)}
                        onStartEdit={() => onStartEdit(item.id)}
                        onDelete={() => onDelete(item.id)}
                        isEditing={isEditing}
                        onCancel={onCancel}
                        onSave={(newTask) => onSave(item.id, newTask)}
                        disableEdit={disableEdit}
                    />

                })
            )}
        </div>
    );
}