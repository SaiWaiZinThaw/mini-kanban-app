import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { TaskCreateSchema } from "@/utils/schema/schema";
import { Input } from "./ui/input";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import type { TaskType } from "@/utils/types/type";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";
import { LucidePencil, X } from "lucide-react";
import { auth, db, doc, updateDoc } from "@/utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import LoadingButton from "./loading-button";
import { toast } from "sonner";

const TaskEditDialog = ({
  tasks,
  setTasks,
  initialTask,
}: {
  initialTask: TaskType;
  tasks: TaskType[];
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
}) => {
  const [user] = useAuthState(auth);
  const form = useForm<z.infer<typeof TaskCreateSchema>>({
    resolver: zodResolver(TaskCreateSchema),
    defaultValues: {
      title: initialTask?.title,
      description: initialTask?.description,
      status: initialTask?.status,
    },
  });

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      const latestTask = tasks.find((task) => task.id === initialTask.id);
      if (latestTask) {
        form.reset({
          title: latestTask.title,
          description: latestTask.description,
          status: latestTask.status,
        });
      }
    }
    setOpen(newOpen);
  };

  const onSubmit = async (values: z.infer<typeof TaskCreateSchema>) => {
    if (!user) return;

    const taskId = initialTask.id;
    setLoading(true);
    try {
      const taskRef = doc(db, "tasks", taskId);
      await updateDoc(taskRef, {
        title: values.title,
        description: values.description,
        status: values.status,
      });

      const taskIndex = tasks.findIndex((task) => task.id === taskId);

      if (taskIndex !== -1) {
        const updatedTasks = [...tasks];
        updatedTasks[taskIndex] = { ...updatedTasks[taskIndex], ...values };
        setTasks(updatedTasks);
      }

      setOpen(false);
    } catch (err: any) {
      console.error("Error updating task:", err.message);
      alert("Failed to update task. Check console for details.");
    } finally {
      setLoading(false);
      toast("Task updated successfully");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger onClick={() => setOpen(true)}>
        <LucidePencil className="w-5 h-5 cursor-pointer" />
      </AlertDialogTrigger>
      <AlertDialogContent className="!border-b-4 border-2 border-r-4 border-[#001A23]">
        <AlertDialogTitle className="w-full justify-between flex">
          Edit a task
          <X
            onClick={() => {
              setOpen(false);
              form.reset();
            }}
            className="h-6 w-6 cursor-pointer"
          />
        </AlertDialogTitle>
        <AlertDialogDescription>
          Edit the task with the form below
        </AlertDialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>

                  <FormControl>
                    <Input placeholder="Description" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <LoadingButton isLoading={loading}>Edit</LoadingButton>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default TaskEditDialog;
