import TaskCreateDialog from "@/components/task-create-dialog";
import TasksContainer from "@/components/tasks-container";
import { useAuth } from "@/context/auth-context";
import { signOut } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import Auth from "./Auth";
const Home = () => {
  const naviagte = useNavigate();
  const handleSignOut = async () => {
    await signOut(auth);
    naviagte(0);
  };

  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Auth />;
  }
  return (
    <div className="p-5">
      <div className="flex items-center w-full justify-between mb-8">
        <h1 className="text-4xl text-center font-bold justify-self-center  uppercase ">
          Task Management App
        </h1>
        <Button onClick={handleSignOut}>Sign Out</Button>
      </div>
      <TaskCreateDialog />
      <TasksContainer />
    </div>
  );
};

export default Home;
