import './TaskInput.css'

const TaskInput = ({ value, inputHandler, submitHandler }) => {
  return (
    <form id="task-form" onSubmit={submitHandler} autoComplete="off">
      <input type="text" name="task" id="task-input" value={value}
        onChange={inputHandler} placeholder="Enter your task" required/>
    </form>
  )
}

export default TaskInput