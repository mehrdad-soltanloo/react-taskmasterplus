import { nanoid } from "nanoid";
import { useState, useEffect } from "react";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import FilterButtons from "./FilterButtons";

const TodoApp = ({ theme }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");
  // const [theme, setTheme] = useState("light");

  // Load tasks from localStorage when the component mounts
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    const storedTheme = localStorage.getItem("theme");

    if (storedTasks && storedTasks !== "[]") {
      setTasks(JSON.parse(storedTasks)); // Load and parse tasks from JSON string to array
    }
  }, []);

  // Save tasks to localStorage whenever `tasks` state changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim() === "") return;

    const taskObject = {
      id: nanoid(),
      text: newTask,
      completed: false,
    };

    setTasks([...tasks, taskObject]);
    setNewTask("");
  };

  // Remove a task
  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle task completion
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Filter tasks based on the completion status
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    return true; // Show all tasks for "all"
  });

  return (
    <div className={`todo-container ${theme}`}>
      <h1>TaskMasterPlus - Todo List</h1>

      <TaskForm newTask={newTask} setNewTask={setNewTask} addTask={addTask} />

      <FilterButtons setFilter={setFilter} />

      <TaskList
        tasks={filteredTasks}
        toggleComplete={toggleComplete}
        removeTask={removeTask}
      />
    </div>
  );
};

export default TodoApp;
