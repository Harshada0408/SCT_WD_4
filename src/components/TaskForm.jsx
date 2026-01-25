import { useState } from "react";
import { Check, X } from "lucide-react";
import { useTaskContext } from "../context/TaskContext";

const TaskForm = ({ close }) => {
  const { addTask, currentList } = useTaskContext();
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "medium",
    list: currentList,
  });

  const submit = () => {
    if (!task.title.trim()) return;
    addTask(task);
    close();
  };

  return (
    <div className="p-4 bg-purple-50 rounded-xl">
      <input
        placeholder="Task title"
        className="w-full mb-2 p-3 border border-slate-300 rounded-lg
                   text-slate-800 placeholder-slate-400"
        onChange={(e) => setTask({ ...task, title: e.target.value })}
      />

      <textarea
        placeholder="Description"
        className="w-full mb-2 p-3 border border-slate-300 rounded-lg
                   text-slate-800 placeholder-slate-400"
        onChange={(e) => setTask({ ...task, description: e.target.value })}
      />

      <div className="flex gap-2">
        <button
          onClick={submit}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-lg"
        >
          <Check />
        </button>
        <button
          onClick={close}
          className="p-3 bg-slate-300 hover:bg-slate-400 rounded-lg"
        >
          <X />
        </button>
      </div>
    </div>
  );
};

export default TaskForm;