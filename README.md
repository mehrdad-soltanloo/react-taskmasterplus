# TaskMasterPlus - Todo List with Theme Toggle

TaskMasterPlus is a Todo List app built with React that allows users to add, remove, and mark tasks as complete or incomplete. It also includes a theme toggle to switch between light and dark modes, with the entire page and todo app reflecting the theme changes. The app stores tasks and theme preferences in localStorage, ensuring persistence across sessions.

## Features

- **Add, Remove, and Mark Tasks**: Users can add tasks, remove tasks, and mark tasks as complete or incomplete.
- **Theme Toggle**: Switch between light and dark themes, and the theme applies to the whole page (not just the Todo app).
- **LocalStorage Persistence**: Tasks and theme preference are saved in localStorage so that they persist across sessions.
- **Component-Based Architecture**: The project is broken into reusable components like `TodoApp`, `TaskForm`, `TaskList`, `TaskItem`, `FilterButtons`, and `ThemeToggle`.

## Folder Structure

```
taskmasterplus/
├── public/
├── src/
│   ├── components/
│   │   └── TodoApp.jsx         # Main component handling the Todo logic
│   │   └── TaskForm.jsx        # Component for adding new tasks
│   │   └── TaskList.jsx        # Component for rendering the list of tasks
│   │   └── TaskItem.jsx        # Component for individual tasks
│   │   └── FilterButtons.jsx   # Component for filtering tasks by status
│   │   └── ThemeToggle.jsx     # Component for toggling the light/dark theme
│   ├── App.jsx                 # Root component managing the theme and overall layout
│   ├── main.jsx                # Entry point for the app
│   └── index.css               # Global styles for the app
└── package.json
```

## Installation and Setup

To get the project up and running locally, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/taskmasterplus.git
cd taskmasterplus
```

### 2. Install Dependencies

Use npm to install the project dependencies:

```bash
npm install
```

### 3. Run the Development Server

Start the development server:

```bash
npm run dev
```

Open the app in your browser at `http://localhost:3000`.

## Usage

### Adding a Task

1. Enter a task in the input field.
2. Press the "Add Task" button to add the task to the list.

### Removing a Task

- Click the "Remove" button next to the task to delete it from the list.

### Marking a Task as Complete

- Click the checkbox next to the task to mark it as complete (the task will be struck through).

### Filtering Tasks

- Use the "All", "Completed", or "Incomplete" buttons to filter the tasks based on their completion status.

### Switching Between Light and Dark Themes

- Click the "Switch to Dark/Light Theme" button to toggle between light and dark modes. The theme is stored in localStorage and will persist across sessions.

## Component Breakdown

### `TodoApp.jsx`

The main component responsible for:

- Managing the list of tasks (`tasks` state) and the filter (`filter` state).
- Passing down the theme, task management, and filtering functions to child components.

```jsx
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import FilterButtons from "./FilterButtons";

const TodoApp = ({ theme }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

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

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

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
```

### `TaskForm.jsx`

Handles the input for adding new tasks.

```jsx
const TaskForm = ({ newTask, setNewTask, addTask }) => {
  return (
    <form onSubmit={addTask}>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
```

### `TaskList.jsx`

Renders the list of tasks using the `TaskItem` component.

```jsx
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, toggleComplete, removeTask }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          toggleComplete={toggleComplete}
          removeTask={removeTask}
        />
      ))}
    </ul>
  );
};

export default TaskList;
```

### `TaskItem.jsx`

Represents each individual task.

```jsx
const TaskItem = ({ task, toggleComplete, removeTask }) => {
  return (
    <li style={{ textDecoration: task.completed ? "line-through" : "none" }}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleComplete(task.id)}
      />
      {task.text}
      <button onClick={() => removeTask(task.id)}>Remove</button>
    </li>
  );
};

export default TaskItem;
```

### `FilterButtons.jsx`

Allows filtering tasks based on their completion status (all, completed, or incomplete).

```jsx
const FilterButtons = ({ setFilter }) => {
  return (
    <div>
      <button onClick={() => setFilter("all")}>All</button>
      <button onClick={() => setFilter("completed")}>Completed</button>
      <button onClick={() => setFilter("incomplete")}>Incomplete</button>
    </div>
  );
};

export default FilterButtons;
```

### `ThemeToggle.jsx`

Handles switching between light and dark themes.

```jsx
const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <button onClick={toggleTheme}>
      Switch to {theme === "light" ? "Dark" : "Light"} Theme
    </button>
  );
};

export default ThemeToggle;
```

## Contributing

Contributions are welcome! If you have suggestions for improving the app, feel free to fork the repository and create a pull request. Whether it’s fixing a bug, adding a new feature, or improving the documentation, I would love to see your contributions.

### Steps to Contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes and commit them with descriptive messages.
4. Push your branch to your forked repository.
5. Open a pull request to the `main` branch of this repository.

Thank you in advance for your contribution!

## Thank You

> Thank you for checking out **TaskMasterPlus**! I appreciate your time and interest in this project. Whether you're using the app, providing feedback, or contributing to the code, your support means a lot. I hope you find this project useful and inspiring for your own development journey.

Happy coding! 🙂
