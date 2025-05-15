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
import { Button } from "./ui/button";
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

const TaskEditDialog = ({
  tasks,
  setTasks,
  initialTask,
}: {
  initialTask: TaskType;
  tasks: TaskType[];
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
}) => {
  const form = useForm<z.infer<typeof TaskCreateSchema>>({
    resolver: zodResolver(TaskCreateSchema),
    defaultValues: {
      title: initialTask?.title,
      description: initialTask?.description,
      status: initialTask?.status,
    },
  });

  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      // Find the latest version of the task from the updated tasks list
      const latestTask = tasks.find((task) => task.id === initialTask.id);
      if (latestTask) {
        // Reset the form with the latest task data
        form.reset({
          title: latestTask.title,
          description: latestTask.description,
          status: latestTask.status,
        });
      }
    }
    setOpen(newOpen);
  };

  const onSubmit = (values: z.infer<typeof TaskCreateSchema>) => {
    const taskIndex = tasks.findIndex((task) => task.id === initialTask.id);

    if (taskIndex !== -1) {
      const updatedTasks = [...tasks];
      updatedTasks[taskIndex] = { ...updatedTasks[taskIndex], ...values };
      setTasks(updatedTasks);
    }

    setOpen(false);
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

            <Button type="submit">Edit</Button>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default TaskEditDialog;
