import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashCan, faStar, faCalendar, faBars } from "@fortawesome/free-solid-svg-icons"

import DailyDark from "./assets/daily-dark.svg"
import DailyLight from "./assets/daily-light.svg"
import "./App.css"

const Task = ({ task, checkHandler, removeHandler, importanceHandler }) => {
  const styleNormal = {
    textDecoration: 'none'
  }

  const styleChecked = {
    textDecoration: 'line-through'
  }

  return (
    <div className="task-container">
      <input type="checkbox" onChange={() => checkHandler(task.id)} />
      <p style={task.checked ? styleChecked : styleNormal} id={task.id}>{task.name}</p>
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

const TaskList = ({ tasks, checkHandler, removeHandler, importanceHandler }) => {

  return (
    <div className="task-list">
      {tasks.map(task =>
        <Task key={task.id} task={task} checkHandler={checkHandler}
          removeHandler={removeHandler}
          importanceHandler={importanceHandler} />
      )}
    </div>
  )
}

const TaskInput = ({ value, inputHandler, submitHandler }) => {
  return (
    <form id="task-form" onSubmit={submitHandler} autoComplete="off">
      <input type="text" name="task" id="task-input" value={value}
        onChange={inputHandler} placeholder="Enter your task" required/>
    </form>
  )
}

const Navigation = ({ searchVal, searchHandler }) => {
  return (
    <>
      <img src={DailyDark} alt="Daily dark mode logo" className="logo" />
      <input autoComplete="off" type="text" name="search" id="search-input"
        placeholder="Search" value={searchVal}
        onChange={searchHandler} />
    </>
  )
}

const App = () => {
  const [taskName, setTaskName] = useState('')
  const [filter, setFilter] = useState('')
  const [tasks, setTasks] = useState([])
  const [darkMode, setDarkMode] = useState(false)
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth))
    console.log(width)
    const nav = document.querySelector('.nav-container')
    const middle = document.querySelector('.middle-container')
    const ham = document.querySelector('.ham-menu')
    if (width <= 600) {
      nav.style.display = 'none'
      middle.style.width = '100vw'
      ham.style.display = 'block'
    } else {
      nav.style.display = 'block'
      nav.style.position = 'initial'
      nav.style.animation = ''
      nav.style.width = '20vw'
      middle.style.width = '80vw'
      middle.style.filter = ''
      ham.style.display = 'none'
    }
  }, [width])

  const handleTaskChange = (event) => setTaskName(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  const handleCheck = (id) => {
    const index = tasks.findIndex(t => t.id === id)
    const copy = [...tasks]
    copy[index] = { ...tasks[index], checked: !tasks[index].checked }
    copy.sort((a, b) => {
      if (a.checked === b.checked) {
        if (a.dateCreated > b.dateCreated) {
          return 1
        } else if (a.dateCreated < b.dateCreated) {
          return -1
        } else {
          return 0
        }
      } else if (a.checked) {
        return 1
      }

      return -1
    })
    setTasks(copy)
  }

  const addTask = (event) => {
    event.preventDefault()
    const taskObj = {
      id: Math.floor(Math.random() * 1000000),
      dateCreated: new Date(),
      name: taskName,
      checked: false,
      important: false
    }
    setTasks(tasks.concat(taskObj))
    setTaskName('')
  }

  const removeTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id))
  }

  const toggleImportance = (id) => {
    const task = tasks.find(t => t.id === id)
    const changedTask = { ...task, important: !task.important }
    setTasks(tasks.map(t => t.id === id ? changedTask : t))
  }

  const toggleNavigation = () => {
    const nav = document.querySelector('.nav-container')
    const middle = document.querySelector('.middle-container')
    if (!nav.style.display || nav.style.display === 'none') {
      nav.style.display = 'block'
      nav.style.position = 'absolute'
      nav.style.width = '70vw'
      nav.style.zIndex = 1
      nav.style.animation = 'expand 0.2s linear'
      middle.style.filter = 'brightness(70%)'
    } else {
      nav.style.display = 'none'
      middle.style.width = '100vw'
      middle.style.filter = ''
    }
  }

  const tasksToShow = tasks.filter(t => t.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div className="outer-container">
      <div className="nav-container">
        <div className="ham-menu">
          <FontAwesomeIcon className="ham-icon" onClick={toggleNavigation} icon={faBars}
            size="lg" />
        </div>
        <Navigation searchVal={filter} searchHandler={handleFilterChange} />
      </div>
      <div className="middle-container">
        <div className="ham-menu">
          <FontAwesomeIcon className="ham-icon" onClick={toggleNavigation} icon={faBars}
            size="lg" />
        </div>
        <TaskInput value={taskName} inputHandler={handleTaskChange}
          submitHandler={addTask} />
        <h2>Tasks</h2>
        <TaskList tasks={tasksToShow} checkHandler={handleCheck}
          removeHandler={removeTask}
          importanceHandler={toggleImportance} />
      </div>
    </div>
  )
}

export default App