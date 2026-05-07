function TaskList({ tasks, onDelete, onToggle, onEdit, editingTaskId, editingTask, setEditingTask, onSave, openedTaskId, setOpenedTaskId }) {
    return (
        <ul>
            {tasks.map((task) => (
                <li key={task.id}>
                    <input
                        type='checkbox'
                        checked={task.completed}
                        onChange={() => onToggle(task.id)} />
                    {editingTaskId === task.id ? (
                        <>
                            <input
                                value={editingTask.title}
                                onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                                placeholder="Title"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        onSave();
                                    }
                                }}
                            />

                            <input
                                value={editingTask.description}
                                onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                                placeholder="Description"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        onSave();
                                    }
                                }}
                            />
                            <button onClick={onSave} title="Сохранить">💾</button>
                        </>
                    )
                        : (
                            <>
                                <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                                    {task.title}
                                </span>
                                <button onClick={() => setOpenedTaskId(
                                    openedTaskId === task.id ? null : task.id
                                )}>
                                    Подробнее
                                </button>

                                {openedTaskId === task.id && (<p>
                                    {task.description}
                                </p>)}

                                <button onClick={() => onEdit(task)} title="Редактировать">✏️</button>
                            </>
                        )}
                    <button onClick={() => onDelete(task.id)} title="Удалить">❌</button>

                </li>
            ))}
        </ul>
    )
}

export default TaskList;