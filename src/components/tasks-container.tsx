import { useEffect, useState } from "react";
import type { TaskType } from "@/utils/types/type";
import TaskCard from "./task-card";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {
  auth,
  collection,
  db,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "@/utils/firebase";
import TaskCardSkeleton from "./task-card-skeletons";

const TasksContainer = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!auth.currentUser) return;
    setLoading(true);
    const q = query(
      collection(db, "tasks"),
      where("userId", "==", auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedTasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as TaskType[];
      setTasks(updatedTasks);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const toDoTasks = tasks.filter((task) => task.status === "todo");
  const inProgressTasks = tasks.filter((task) => task.status === "in-progress");
  const doneTasks = tasks.filter((task) => task.status === "done");

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    const taskToUpdate = tasks.find((task) => task.id === draggableId);
    if (!taskToUpdate) return;

    const updatedTask = {
      ...taskToUpdate,
      status: destination.droppableId,
    };

    setTasks((prev) =>
      prev.map((task) => (task.id === draggableId ? updatedTask : task))
    );

    const taskRef = doc(db, "tasks", draggableId);
    updateDoc(taskRef, {
      status: destination.droppableId,
    });
  };

  useEffect(() => {
    console.log(loading);
  }, [loading]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 min-h-screen mt-5 ">
        {/* To Do Column */}
        <div className="border-r-2 border-[#001A23]">
          <h1 className="text-lg md:text-2xl text-center font-bold uppercase border-y-2 border-[#001A23] p-3">
            To Do
          </h1>
          <Droppable
            ignoreContainerClipping={true}
            type="group"
            droppableId="todo"
            isDropDisabled={false}
            isCombineEnabled={true}
          >
            {(provided) => (
              <section
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="p-3 flex flex-col grow "
              >
                {loading ? (
                  <>
                    <TaskCardSkeleton />
                    <TaskCardSkeleton />
                    <TaskCardSkeleton />
                  </>
                ) : (
                  toDoTasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={String(task.id)}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskCard
                            tasks={tasks}
                            setTasks={setTasks}
                            task={task}
                            variant={task.status}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))
                )}
                {provided.placeholder}
              </section>
            )}
          </Droppable>
        </div>

        <div className="border-r-2 border-[#001A23]">
          <h1 className="text-lg md:text-2xl text-center font-bold uppercase border-y-2 border-[#001A23] p-3">
            In Progress
          </h1>
          <Droppable
            ignoreContainerClipping={true}
            type="group"
            droppableId="in-progress"
            isDropDisabled={false}
            isCombineEnabled={true}
          >
            {(provided) => (
              <section
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="p-3 flex flex-col grow "
              >
                {loading ? (
                  <>
                    <TaskCardSkeleton />
                    <TaskCardSkeleton />
                    <TaskCardSkeleton />
                  </>
                ) : (
                  inProgressTasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={String(task.id)}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskCard
                            tasks={tasks}
                            setTasks={setTasks}
                            task={task}
                            variant={task.status}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))
                )}
                {provided.placeholder}
              </section>
            )}
          </Droppable>
        </div>

        <div className="border-r-2 border-[#001A23]">
          <h1 className="text-lg md:text-2xl text-center font-bold uppercase border-y-2 border-[#001A23] p-3">
            Done
          </h1>
          <Droppable
            ignoreContainerClipping={true}
            type="group"
            droppableId="done"
            isDropDisabled={false}
            isCombineEnabled={true}
          >
            {(provided) => (
              <section
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="p-3 flex flex-col grow "
              >
                {loading ? (
                  <>
                    <TaskCardSkeleton />
                    <TaskCardSkeleton />
                    <TaskCardSkeleton />
                  </>
                ) : (
                  doneTasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={String(task.id)}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskCard
                            tasks={tasks}
                            setTasks={setTasks}
                            task={task}
                            variant={task.status}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))
                )}
                {provided.placeholder}
              </section>
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  );
};

export default TasksContainer;
