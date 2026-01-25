import { createContext, useContext, useEffect, useState } from "react";

const TaskContext = createContext(null);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within TaskProvider");
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [lists, setLists] = useState(() => {
    const saved = localStorage.getItem("lists");
    return saved
      ? JSON.parse(saved)
      : ["Miscellaneous", "Personal", "Work", "Shopping", "Health"];
  });

  const [currentList, setCurrentList] = useState(
    localStorage.getItem("currentList") || "Miscellaneous"
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(lists));
  }, [lists]);

  useEffect(() => {
    localStorage.setItem("currentList", currentList);
  }, [currentList]);

  const addTask = (task) => {
    setTasks(prev => [
      ...prev,
      {
        id: Date.now(),
        ...task,
        completed: false,
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  const updateTask = (id, updates) => {
    setTasks(prev =>
      prev.map(task => (task.id === id ? { ...task, ...updates } : task))
    );
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const addNewList = (listName) => {
    if (listName && !lists.includes(listName)) {
      setLists(prev => [...prev, listName]);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        lists,
        currentList,
        setCurrentList,
        addTask,
        updateTask,
        deleteTask,
        toggleComplete,
        addNewList,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};