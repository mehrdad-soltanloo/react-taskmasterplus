const TaskItem = ({ task, toggleComplete, removeTask }) => {
  return (
    <li style={{ textDecoration: task.completed ? "line-through" : "none" }}>
      <div className="checked-text">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleComplete(task.id)}
        />
        {task.text}
      </div>
      <div>
        <button onClick={() => removeTask(task.id)} className="remove-btn">
          Remove
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
