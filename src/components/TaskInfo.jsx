import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faX } from "@fortawesome/free-solid-svg-icons"

const TaskInfo = ({ task, closeHandler, editHandler, dateHandler }) => {
  if (!task) return null

  return (
    <div className="task-info">
      <div className="close-icon">
        <FontAwesomeIcon onClick={() => closeHandler(task.id)} icon={faX} size="sm" />
      </div>
      <div className="edit-container">
        <input id={`ed${task.id}`}
          onChange={editHandler} value={task.name} className="edit-task" type="text" />
      </div>
      <h3>Add Due Date</h3>
      <input type="datetime-local" value={task.dueDate} onChange={dateHandler} />
    </div>
  )
}

export default TaskInfo