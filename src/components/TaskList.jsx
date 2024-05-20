import Task from "./Task"

const TaskList = ({
  tasks, checkHandler, removeHandler, importanceHandler,
  infoHandler
 }) => {

  return (
    <div className="task-list">
      {tasks.map(task =>
        <Task key={task.id} task={task} checkHandler={checkHandler}
          removeHandler={removeHandler}
          importanceHandler={importanceHandler}
          infoHandler={infoHandler} />
      )}
    </div>
  )
}

export default TaskList