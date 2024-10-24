const TaskForm = ({ newTask, setNewTask, addTask }) => {
  return (
    <form onSubmit={addTask} className="task-form">
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
