import { useState, useEffect } from 'react'
import './App.css'
import TaskList from './components/TaskList';

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
    setEditingTaskId(task.id);

    setEditingTask({
      title: task.title,
      description: task.description,
    });
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

  return (
    <div>
      <h1>Мои задачи</h1>

      <input value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleAddTasks();
          }
        }}
        placeholder='Введите задачу' />

      <input value={description}
        onChange={(e) => setDescription(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleAddTasks();
          }
        }}
        placeholder='Description...' />

      <button onClick={handleAddTasks}>Добавить</button>

      <></>
      <input
        type='text'
        placeholder='Search...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div>
        <button
          onClick={() => setFilter("all")}
          style={{
            fontWeight: filter === "all" ? "bold" : "normal",
          }}>
          All
        </button>
        <button
          onClick={() => setFilter("active")}
          style={{
            fontWeight: filter === "active" ? "bold" : "normal",
          }}>
          Active
        </button>
        <button
          onClick={() => setFilter("completed")}
          style={{
            fontWeight: filter === "completed" ? "bold" : "normal",
          }}>
          Completed
        </button>
      </div>

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
  )
}

export default App;
