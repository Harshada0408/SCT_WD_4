import { useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";
import TaskFilters from "./TaskFilters";

const TaskList = () => {
  const { tasks, currentList } = useTaskContext();

  const [adding, setAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const filteredTasks = tasks
    .filter(task => task.list === currentList)
    .filter(task => {
      if (filterStatus === "completed") return task.completed;
      if (filterStatus === "active") return !task.completed;
      return true;
    })
    .filter(task => {
      if (filterPriority === "all") return true;
      return task.priority === filterPriority;
    })
    .filter(task =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200 p-6">
      <TaskFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        filterPriority={filterPriority}
        setFilterPriority={setFilterPriority}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
      />

{!adding && (
  <button
    onClick={() => setAdding(true)}
    className="w-full py-4 border-2 border-dashed border-slate-300
               rounded-lg text-slate-700 hover:border-indigo-500
               hover:text-indigo-600 mb-6 font-medium"
  >
    Add Task
  </button>
)}

      {adding && <TaskForm close={() => setAdding(false)} />}

      <div className="space-y-3 mt-6">
        {filteredTasks.length === 0 ? (
          <p className="text-center text-gray-400">No tasks found</p>
        ) : (
          filteredTasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;