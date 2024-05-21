import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons"
import { faTrashCan } from "@fortawesome/free-regular-svg-icons"

import "./Task.css"

const Task = ({
  task,
  checkHandler,
  removeHandler,
  importanceHandler,
  infoHandler
  }) => {

  const styleNormal = {
    textDecoration: 'none'
  }

  const styleDone = {
    textDecoration: 'line-through',
    color: 'grey'
  }

  return (
    <div className="task-container" id={`t${task.id}`}>
      <input type="checkbox" onChange={() => checkHandler(task.id)} checked={task.done} />
      <p onClick={() => infoHandler(task.id)}
        style={task.done ? styleDone : styleNormal}
        id={task.id}>{task.name}</p>
      <div className="modifiers">
        <span>
          <FontAwesomeIcon
            icon={task.important ? faStar : faStarRegular}
            onClick={() => importanceHandler(task.id)} size="lg" className="star-icon" color={task.important ? "#a3bcc0ff" : "#ffffff"} />
        </span>
        <span>
          <FontAwesomeIcon onClick={() => removeHandler(task.id)} icon={faTrashCan} size="lg" className="trash-icon" />
        </span>
      </div>
    </div>
  )
}

export default Task