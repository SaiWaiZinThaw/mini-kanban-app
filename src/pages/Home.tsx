import { useEffect, useState } from "react";
import { getTasksFromStorage, saveTasksToStorage } from "@/utils/localStorage";
import TaskCreateDialog from "@/components/task-create-dialog";
import TasksContainer from "@/components/tasks-container";
import type { TaskType } from "@/utils/types/type";
import { useAuth } from "@/context/auth-context";
import SignIn from "./SignIn";
import { signOut } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
const Home = () => {
  const [tasks, setTasks] = useState<TaskType[]>(() => getTasksFromStorage());
  const naviagte = useNavigate();
  const handleSignOut = async () => {
    await signOut(auth);
    naviagte(0);
  };
  useEffect(() => {
    saveTasksToStorage(tasks);
  }, [tasks]);

  const { currentUser } = useAuth();

  if (!currentUser) {
    return <SignIn />;
  }
  return (
    <div className="p-5">
      <div className="flex items-center w-full justify-between">
        <h1 className="text-4xl text-center font-bold justify-self-center  uppercase ">
          Task Management App
        </h1>
        <Button onClick={handleSignOut}>Sign Out</Button>
      </div>
      <TaskCreateDialog setTasks={setTasks} tasks={tasks} />
      <TasksContainer tasks={tasks} setTasks={setTasks} />
    </div>
  );
};

export default Home;
