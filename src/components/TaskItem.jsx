import { Trash2, Check } from "lucide-react";
import { useTaskContext } from "../context/TaskContext";

const TaskItem = ({ task }) => {
  const { deleteTask, toggleComplete } = useTaskContext();

  return (
    <div className="p-4 border rounded-xl flex justify-between items-center">
      <div>
        <h3 className={task.completed ? "line-through text-gray-400" : ""}>
          {task.title}
        </h3>
        {task.description && (
          <p className="text-sm text-gray-500">{task.description}</p>
        )}
      </div>

      <div className="flex gap-2">
        <button onClick={() => toggleComplete(task.id)}>
          <Check />
        </button>
        <button onClick={() => deleteTask(task.id)}>
          <Trash2 />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;