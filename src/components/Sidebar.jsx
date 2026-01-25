import { Plus } from "lucide-react";
import { useTaskContext } from "../context/TaskContext";

const Sidebar = () => {
  const { lists, currentList, setCurrentList, tasks, addNewList } =
    useTaskContext();

  const handleAddList = () => {
    const name = prompt("Enter list name");
    addNewList(name);
  };

  return (
    <div className="bg-slate-50 rounded-xl border border-slate-200 p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold text-slate-800">Lists</h2>
        <button onClick={handleAddList}>
          <Plus />
        </button>
      </div>

      {lists.map(list => (
        <button
          key={list}
          onClick={() => setCurrentList(list)}
          className={`w-full text-left px-4 py-3 rounded-lg mb-2 font-medium transition ${
            currentList === list
              ? "bg-indigo-600 text-white"
              : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          {list}
          <span className="float-right">
            {tasks.filter(t => t.list === list).length}
          </span>
        </button>
      ))}
    </div>
  );
};

export default Sidebar;