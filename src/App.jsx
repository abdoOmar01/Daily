import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"

import TaskInfo from "./components/TaskInfo"
import TaskInput from "./components/TaskInput"
import TaskList from "./components/TaskList"
import Navigation from "./components/Navigation"

import DailyDark from "./assets/daily-dark.svg"
import DailyLight from "./assets/daily-light.svg"

import "./App.css"

const App = () => {
  const [taskName, setTaskName] = useState('')
  const [filter, setFilter] = useState('')
  const [tasks, setTasks] = useState([])
  const [darkMode, setDarkMode] = useState(true)
  const [width, setWidth] = useState(window.innerWidth)
  const [info, setInfo] = useState(null)

  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth))
    console.log(width)
    const nav = document.querySelector('.nav-container')
    const middle = document.querySelector('.middle-container')
    const ham = document.querySelector('.ham-menu')
    if (width <= 600) {
      nav.style.display = 'none'
      middle.style.display = info ? 'none' : 'block'
      middle.style.width = '100vw'
      ham.style.display = 'block'
    } else {
      nav.style.display = 'block'
      nav.style.position = 'initial'
      nav.style.animation = ''
      nav.style.width = '20vw'
      middle.style.display = 'block'
      middle.style.width = info ? '55vw' : '80vw'
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

  const toggleInfo = (id) => {
    const middleContainer = document.querySelector('.middle-container')
    if (info && id === info.id) {
      middleContainer.style.display = 'block'
      middleContainer.style.width = width <= 600 ? '100vw' : '80vw'
      return setInfo(null)
    }
    
    if (width <= 600) {
      middleContainer.style.display = 'none'
    }
    middleContainer.style.width = '55vw'
    setInfo(tasks.find(t => t.id === id))
  }

  const tasksToShow = tasks.filter(t => t.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div className="outer-container">
      <Navigation
        searchVal={filter}
        searchHandler={handleFilterChange}
        navHandler={toggleNavigation}
        image={darkMode ? DailyDark : DailyLight} />

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
          importanceHandler={toggleImportance}
          infoHandler={toggleInfo} />
      </div>

      <TaskInfo task={info} closeHandler={toggleInfo} />
    </div>
  )
}

export default App