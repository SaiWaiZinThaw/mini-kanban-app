export type TaskStatus = "todo" | "in-progress" | "done";

export interface TaskType {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
}
