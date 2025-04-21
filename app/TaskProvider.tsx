import React, { createContext, useState, useContext } from 'react';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  time: string;
  description: string;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  toggleTaskComplete: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (newTask: Task) => {
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const toggleTaskComplete = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTaskComplete }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
}