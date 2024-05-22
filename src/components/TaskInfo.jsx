import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import date from "../utils/date"

import "./TaskInfo.css"

const TaskInfo = ({ task, closeHandler, editHandler, renameHandler, dateHandler }) => {
  if (!task) return null

  return (
    <div className="task-info">
      <div className="close-icon">
        <FontAwesomeIcon onClick={() => closeHandler(task.id)} icon={faXmark} size="lg" />
      </div>
      <form className="edit-container" onSubmit={renameHandler} autoComplete="off">
        <input onChange={editHandler} value={task.name}
          className="edit-task" type="text" required />
      </form>
      <h3>Add due date</h3>
      <input type="datetime-local"
        value={task.dueDate === task.dateCreated ? '' : date.toCalendar(task.dueDate)}
        onChange={dateHandler} />

      <div className="creation-date">
        <h4>Created on {date.toFull(task.dateCreated)}</h4>
      </div>
    </div>
  )
}

export default TaskInfo