import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faX } from "@fortawesome/free-solid-svg-icons"

const TaskInfo = ({ task, closeHandler }) => {
  if (!task) return null

  return (
    <div className="task-info">
      <div className="close-icon">
        <FontAwesomeIcon onClick={() => closeHandler(task.id)} icon={faX} size="lg" />
      </div>
      <p>Task Created on {task.dateCreated.toString()}</p>
    </div>
  )
}

export default TaskInfo