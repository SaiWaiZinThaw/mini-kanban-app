import type { TaskType } from "@/utils/types/type";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { RiDraggable } from "react-icons/ri";
import { cn } from "@/lib/utils";
import { CheckCheck, Clock, NotepadText } from "lucide-react";
import TaskEditDialog from "./task-edit-dialog";
import { cva } from "class-variance-authority";
import DeleteConfirmButton from "./delete-confirm-button";

const taskCardVariants = cva(
  "border-2 border-r-4 border-b-4 !gap-0  w-full h-26 my-1 relative pl-8",
  {
    variants: {
      variant: {
        todo: "bg-[#2196F3]",
        "in-progress": "bg-[#FFC107]",
        done: "bg-[#C8E6C9]",
      },
    },
    defaultVariants: {
      variant: "todo",
    },
  }
);

const TaskCard = ({
  variant,
  task,
  tasks,
  setTasks,
}: {
  task: TaskType;
  variant?: "todo" | "in-progress" | "done";
  tasks: TaskType[];
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
}) => {
  return (
    <Card className={cn(taskCardVariants({ variant }))}>
      {variant === "in-progress" ? (
        <Clock className="absolute top-2 left-2 w-5 h-5 text-black font-bold" />
      ) : variant === "done" ? (
        <CheckCheck className="absolute top-2 left-2 w-5 h-5 text-black font-bold" />
      ) : (
        <NotepadText
          className="absolute top-2 left-2 w-5 h-5 text-black font-bold"
          strokeWidth={2}
        />
      )}

      <CardHeader className="my-0  w-full flex justify-between ">
        <RiDraggable className="w-10 h-10 absolute my-auto top-2 bottom-0 left-4 text-gray-500" />
        <CardTitle
          className={`${
            variant === "done" && "line-through"
          } text-lg font-bold flex items-center gap-2 `}
        >
          {task.title}
        </CardTitle>

        <div className="flex flex-col gap-3 items-center absolute top-5 right-5">
          <TaskEditDialog
            setTasks={setTasks}
            tasks={tasks}
            initialTask={task}
          />
          <DeleteConfirmButton id={task.id} />
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription
          className={`${
            variant === "done" && "line-through "
          }  flex items-center gap-2 text-accent-foreground `}
        >
          {task.description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
