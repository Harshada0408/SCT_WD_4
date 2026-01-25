import { TaskProvider } from "./context/TaskContext";
import AdvancedTaskManager from "./pages/AdvancedTaskManager";

const App = () => {
  return (
    <TaskProvider>
      <AdvancedTaskManager />
    </TaskProvider>
  );
};

export default App;