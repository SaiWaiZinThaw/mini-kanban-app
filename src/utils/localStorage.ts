import type { TaskType } from "./types/type";

const STORAGE_KEY = "tasks";

export const saveTasksToStorage = (tasks: TaskType[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

export const getTasksFromStorage = () => {
  const tasks = localStorage.getItem(STORAGE_KEY);
  return tasks ? JSON.parse(tasks) : [];
};
