import { useState, useEffect } from 'react'
import './App.css'
import TaskList from './components/TaskList';
import { Button, Input, Panel, Textarea, Card, Tabs } from 'mosaic-ui-kit';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");

    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const [input, setInput] = useState("");
  const [description, setDescription] = useState("");

  const [openedTaskId, setOpenedTaskId] = useState(null);

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTask, setEditingTask] = useState({
    title: "",
    description: "",
  });

  const [filter, setFilter] = useState("all");

  const [search, setSearch] = useState("");

  const handleAddTasks = () => {
    if (!input.trim()) {
      alert("Введите название задачи")
      return;
    }

    const newTask = {
      id: Date.now(),
      title: input,
      description: description,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setInput("");
    setDescription("");
  }

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id != id));
  };

  const toggleTask = (id) => {
    setTasks(tasks.map((task) =>
      task.id == id ?
        { ...task, completed: !task.completed }
        : task));
  };

  const startEditing = (task) => {
    if (task != null) {
      setEditingTaskId(task.id);

      setEditingTask({
        title: task.title,
        description: task.description,
      });
    }
    else {
      setEditingTaskId(null)
    }
  };

  const saveEdit = () => {
    if (!editingTask.title.trim()) return;

    setTasks(
      tasks.map((task) =>
        task.id === editingTaskId
          ? {
            ...task,
            title: editingTask.title,
            description: editingTask.description
          }
          : task)
    );

    setEditingTaskId(null);
    setEditingTask({
      title: "",
      description: "",
    });
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "active" && !task.completed) ||
      (filter === "completed" && task.completed);

    const matchesSearch = task.title.toLowerCase()
      .includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  })

  const activeCount = tasks.filter(task => !task.completed).length;
  const completedCount = tasks.filter(task => task.completed).length;

  return (
    <div style={{
      minHeight: '100vh',
      padding: '48px 24px',
    }}>
      <Panel>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          maxWidth: '720px',
          margin: '0 auto',
        }}>
          <h1
            style={{
              fontSize: '28px',
              margin: 0,
              letterSpacing: '1px',
              color: 'white',
            }}
          >
            TASK_MANAGER.EXE
          </h1>

          <Card variant="primary">
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}>

              <Input value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddTasks();
                  }
                }}
                placeholder='Enter the task...' />

              <Textarea value={description}
                rows={4}
                onChange={(e) => setDescription(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddTasks();
                  }
                }}
                placeholder='Description...' />

              <Button onClick={handleAddTasks}>Add</Button>
            </div>
          </Card>

          <Card variant='primary'>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}>
              <Input
                type='text'
                placeholder='Search...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </Card>

          <Tabs
            fullWidth
            variant="accent"
            items={[
              {
                label: `ALL (${tasks.length})`,
                value: 'all',
              },
              {
                label: `ACTIVE (${activeCount})`,
                value: 'active',
              },
              {
                label: `COMPLETED (${completedCount})`,
                value: 'completed',
              },
            ]}
            value={filter}
            onChange={setFilter}
          />

          <TaskList
            tasks={filteredTasks}
            onDelete={handleDeleteTask}
            onToggle={toggleTask}
            onEdit={startEditing}
            editingTaskId={editingTaskId}
            editingTask={editingTask}
            setEditingTask={setEditingTask}
            onSave={saveEdit}
            openedTaskId={openedTaskId}
            setOpenedTaskId={setOpenedTaskId}
          />
        </div>
      </Panel>
    </div>
  )
}

export default App;
