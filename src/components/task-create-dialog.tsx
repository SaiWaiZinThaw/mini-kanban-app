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
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";
import { X } from "lucide-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, createTask } from "@/utils/firebase";
import LoadingButton from "./loading-button";
import { toast } from "sonner";

const TaskCreateDialog = () => {
  const form = useForm<z.infer<typeof TaskCreateSchema>>({
    resolver: zodResolver(TaskCreateSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "todo",
    },
  });
  const [user] = useAuthState(auth);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: z.infer<typeof TaskCreateSchema>) => {
    if (!user) return;
    setLoading(true);

    await createTask(user.uid, values);
    setLoading(false);
    setOpen(false);
    toast("Task created successfully");
    form.reset();
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger
        onClick={() => setOpen(true)}
        className="border-b-4 border-2 md:text-base text-sm  border-r-4 uppercase cursor-pointer active:scale-95 duration-75 ease-in-out text-white bg-primary py-2 px-4 rounded-lg font-bold"
      >
        Add Task
      </AlertDialogTrigger>
      <AlertDialogContent className="!border-b-4 border-2 border-r-4 border-[#001A23]">
        <AlertDialogTitle className="w-full justify-between flex md:text-base text-sm">
          Create A Task
          <X
            onClick={() => {
              setOpen(false);
              form.reset();
            }}
            className="h-6 w-6 cursor-pointer"
          />
        </AlertDialogTitle>
        <AlertDialogDescription className="md:text-base text-sm">
          Create a new task and add it to the list.
        </AlertDialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="md:text-base text-sm">Title</FormLabel>
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
                  <FormLabel className="md:text-base text-sm">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Description" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <LoadingButton isLoading={loading} type="submit">
              Create
            </LoadingButton>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default TaskCreateDialog;
