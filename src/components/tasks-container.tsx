import type { TaskType } from "@/utils/types/type";
import TaskCard from "./task-card";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useState } from "react";
const TasksContainer = ({
  tasks,
  setTasks,
}: {
  tasks: TaskType[];
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
}) => {
  const toDoTasks = tasks.filter((task) => task.status === "todo");
  const inProgressTasks = tasks.filter((task) => task.status === "in-progress");
  const doneTasks = tasks.filter((task) => task.status === "done");
  const [isDropDisabled, setIsDropDisabled] = useState(false);
  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;
    if (!destination) return setIsDropDisabled(true);
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return setIsDropDisabled(true);

    const sourceTask = tasks.find((task) => String(task.id) === draggableId);
    if (!sourceTask) return setIsDropDisabled(true);
    const updatedTasks = tasks.filter((task) => task.id !== sourceTask.id);
    const updatedTask = {
      ...sourceTask,
      status: destination.droppableId,
    };
    const destinationTasks = updatedTasks.filter(
      (task) => task.status === destination.droppableId
    );
    destinationTasks.splice(destination.index, 0, updatedTask);
    const remainingTasks = updatedTasks.filter(
      (task) => task.status !== destination.droppableId
    );
    setTasks([...remainingTasks, ...destinationTasks]);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-3 min-h-screen mt-5 ">
        {/* To Do Column */}
        <div className="border-r-2 border-[#001A23]">
          <h1 className="text-2xl text-center font-bold uppercase border-y-2 border-[#001A23] p-3">
            To Do
          </h1>
          <Droppable
            ignoreContainerClipping={true}
            type="group"
            droppableId="todo"
            isDropDisabled={isDropDisabled}
            isCombineEnabled={true}
          >
            {(provided) => (
              <section
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="p-3 flex flex-col grow "
              >
                {toDoTasks.map((task, index) => (
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
                ))}
                {provided.placeholder}
              </section>
            )}
          </Droppable>
        </div>

        <div className="border-r-2 border-[#001A23]">
          <h1 className="text-2xl text-center font-bold uppercase border-y-2 border-[#001A23] p-3">
            In Progress
          </h1>
          <Droppable
            ignoreContainerClipping={true}
            type="group"
            droppableId="in-progress"
            isDropDisabled={isDropDisabled}
            isCombineEnabled={true}
          >
            {(provided) => (
              <section
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="p-3 flex flex-col grow "
              >
                {inProgressTasks.map((task, index) => (
                  <Draggable
                    key={task.id}
                    draggableId={String(task.id)}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        style={{ padding: "10px" }}
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
                ))}
                {provided.placeholder}
              </section>
            )}
          </Droppable>
        </div>

        <div className="border-r-2 border-[#001A23]">
          <h1 className="text-2xl text-center font-bold uppercase border-y-2 border-[#001A23] p-3">
            Done
          </h1>
          <Droppable
            ignoreContainerClipping={true}
            type="group"
            droppableId="done"
            isDropDisabled={isDropDisabled}
            isCombineEnabled={true}
          >
            {(provided) => (
              <section
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="p-3 flex flex-col grow "
              >
                {doneTasks.map((task, index) => (
                  <Draggable
                    key={task.id}
                    draggableId={String(task.id)}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        style={{ padding: "10px" }}
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
                ))}
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
