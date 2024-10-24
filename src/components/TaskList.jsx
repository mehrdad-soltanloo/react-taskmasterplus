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
