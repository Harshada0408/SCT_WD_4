import Sidebar from "../components/Sidebar";
import TaskList from "../components/TaskList";

const AdvancedTaskManager = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100">
      <div className="max-w-7xl mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Sidebar />
        <TaskList />
      </div>
    </div>
  );
};

export default AdvancedTaskManager;