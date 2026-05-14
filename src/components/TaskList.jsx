import { Input, Textarea, Checkbox, Button, Card, } from "mosaic-ui-kit";

function TaskList({ tasks, onDelete, onToggle, onEdit, editingTaskId, editingTask, setEditingTask, onSave, openedTaskId, setOpenedTaskId }) {
    return (
        <ul style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            padding: 0,
            margin: 0,
            listStyle: 'none',
        }}>
            {tasks.length === 0 && (
                <Card variant="accent">
                    <div
                        style={{
                            textAlign: 'center',
                            opacity: 0.7,
                        }}
                    >
                        NO TASKS FOUND
                    </div>
                </Card>
            )}
            {tasks.map((task) => (
                <Card
                    style={{
                        opacity: task.completed ? 0.7 : 1,
                    }}
                    key={task.id}
                    variant={
                        task.completed
                            ? 'secondary'
                            : 'primary'
                    }
                >
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                    }}>

                        <div style={{
                            display: 'flex',
                            flexDirection: 'center',
                            gap: '12px',
                        }}>
                            <Checkbox
                                checked={task.completed}
                                onChange={() => onToggle(task.id)} />

                            {editingTaskId === task.id ? (
                                <>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '12px',
                                        width: '100%',
                                    }}>
                                        <Input
                                            value={editingTask.title}
                                            onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                                            placeholder="Title"
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    onSave();
                                                }
                                            }}
                                        />

                                        <Textarea
                                            value={editingTask.description}
                                            onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                                            placeholder="Description"
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    onSave();
                                                }
                                            }}
                                        />
                                        <Button
                                            size="small"
                                            style={{
                                                alignSelf: 'flex-start',
                                            }}
                                            variant="accent"
                                            onClick={onSave}
                                        >
                                            Save
                                        </Button>
                                    </div>
                                </>
                            )
                                : (
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: "row",
                                            gap: '4px',
                                        }}
                                    >
                                        <span
                                            style={{
                                                textDecoration:
                                                    task.completed
                                                        ? 'line-through'
                                                        : 'none',
                                                fontWeight: 600,
                                                fontSize: '16px',
                                            }}
                                        >
                                            {task.title}
                                        </span>

                                        <span
                                            style={{
                                                opacity: 0.6,
                                                fontSize: '12px',
                                                letterSpacing: '1px',
                                            }}
                                        >
                                            #{String(task.id).slice(-4)} • {
                                                task.completed
                                                    ? 'completed'
                                                    : 'active'
                                            }
                                        </span>
                                    </div>
                                )}
                        </div>


                        {openedTaskId === task.id && (
                            <p style={{
                                overflowWrap: 'break-word',
                                wordBreak: 'break-word',
                                textAlign: 'start'
                            }}>
                                {task.description}
                            </p>)}
                        <div
                            style={{
                                display: 'flex',
                                gap: '8px',
                                flexWrap: 'wrap',
                                marginTop: '8px',
                                justifyContent: 'flex-end',
                            }}
                        >
                            <Button
                                size="small"
                                variant={
                                    openedTaskId === task.id
                                        ? 'accent'
                                        : 'secondary'
                                }
                                disabled={editingTaskId === task.id}
                                onClick={() => {
                                    onEdit(null);
                                    setOpenedTaskId(openedTaskId === task.id ? null : task.id)
                                }}>
                                Details
                            </Button>
                            <Button
                                size="small"
                                variant="secondary"
                                disabled={editingTaskId === task.id}
                                onClick={() => {
                                    setOpenedTaskId(null);
                                    onEdit(editingTaskId === task.id ? null : task)
                                }}>
                                Edit
                            </Button>

                            <Button
                                size="small"
                                variant="secondary"
                                onClick={() => onDelete(task.id)}
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                </Card>
            ))
            }
        </ul >
    )
}

export default TaskList;