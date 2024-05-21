import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRedo, faTrash } from "@fortawesome/free-solid-svg-icons"

import "./TaskTrash.css"

const DeletedTask = ({ task, restoreHandler, deleteHandler }) => {
  return (
    <div className="trash-container">
      <p>{task.name}</p>
      <div className="modifiers">
        <span onClick={() => restoreHandler(task.id)} className="restore">
          <FontAwesomeIcon icon={faRedo} size="lg" />
        </span>
        <span onClick={() => deleteHandler(task.id)} className="delete">
          <FontAwesomeIcon icon={faTrash} size="lg" />
        </span>
      </div>
    </div>
  )
}

const TaskTrash = ({
  tasks,
  restoreHandler,
  deleteHandler
 }) => {

  return (
    <div className="task-list">
      {tasks.map(task =>
        <DeletedTask key={task.id} task={task}
          restoreHandler={restoreHandler}
          deleteHandler={deleteHandler} />
      )}
    </div>
  )
}

export default TaskTrash