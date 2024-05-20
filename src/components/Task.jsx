import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashCan, faStar } from "@fortawesome/free-solid-svg-icons"

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

  const styleChecked = {
    textDecoration: 'line-through'
  }

  return (
    <div className="task-container" id={`t${task.id}`}>
      <input type="checkbox" onChange={() => checkHandler(task.id)} />
      <p onClick={() => infoHandler(task.id)}
        style={task.checked ? styleChecked : styleNormal}
        id={task.id}>{task.name}</p>
      <div className="modifiers">
        <span>
          <FontAwesomeIcon onClick={() => importanceHandler(task.id)} icon={faStar} size="lg" className="star-icon" color={task.important ? "#a3bcc0ff" : "#ffffff"} />
        </span>
        <span>
          <FontAwesomeIcon onClick={() => removeHandler(task.id)} icon={faTrashCan} size="lg" className="trash-icon" />
        </span>
      </div>
    </div>
  )
}

export default Task