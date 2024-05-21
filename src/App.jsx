import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"

import TaskInfo from "./components/TaskInfo"
import TaskInput from "./components/TaskInput"
import TaskList from "./components/TaskList"
import TaskTrash from "./components/TaskTrash"
import Navigation from "./components/Navigation"

import defaultSort from "./utils/sort"

import DailyDark from "./assets/daily-dark.svg"
import DailyLight from "./assets/daily-light.svg"

import "./App.css"

const App = () => {
  const [tasks, setTasks] = useState([])
  const [deleted, setDeleted] = useState([])
  const [property, setProperty] = useState('all')
  const [taskName, setTaskName] = useState('')
  const [filter, setFilter] = useState('')
  const [darkMode, setDarkMode] = useState(false)
  const [width, setWidth] = useState(window.innerWidth)
  const [info, setInfo] = useState(null)

  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth))
    const nav = document.querySelector('.nav-container')
    const middle = document.querySelector('.middle-container')
    const ham = document.querySelector('.ham-menu')
    if (width <= 800) {
      nav.style.display = 'none'
      middle.style.display = 'block'
      middle.style.width = '100vw'
      middle.style.filter = ''
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
    copy[index] = { ...tasks[index], done: !tasks[index].done }
    copy.sort(defaultSort)
    setTasks(copy)
  }

  const addTask = (event) => {
    event.preventDefault()
    const taskObj = {
      id: Math.floor(Math.random() * 1000000),
      dateCreated: new Date(),
      name: taskName,
      done: false,
      important: false,
      dueDate: new Date(),
      category: 'default'
    }
    setTasks(tasks.concat(taskObj))
    setTaskName('')
    handleShow('all')
  }

  const removeTask = (id) => {
    const task = tasks.find(t => t.id === id)
    setTasks(tasks.filter(t => t.id !== id))
    setDeleted(deleted.concat(task))
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
      nav.style.width = width >= 600 ? '60vw' : '80vw'
      nav.style.zIndex = 1
      nav.style.animation = 'expand 0.2s linear'
      middle.style.filter = `brightness(${darkMode ? '70%' : '90%'})`
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
      middleContainer.style.width = width <= 800 ? '100vw' : '80vw'
      return setInfo(null)
    }
    
    if (width <= 600) {
      middleContainer.style.display = 'none'
    }
    
    middleContainer.style.width = width <= 800 ? '50vw' : '55vw'
    setInfo(tasks.find(t => t.id === id))
  }

  const handleEditChange = (event) => {
    setInfo({ ...info, name: event.target.value })
  }

  const renameTask = (event) => {
    event.preventDefault()
    setTasks(tasks.map(t => t.id === info.id ? { ...t, name: info.name } : t))
  }

  const handleDateChange = (event) => {
    setInfo({ ...info, dueDate: event.target.value })
    setTasks(tasks.map(t => t.id === info.id ? { ...t, dueDate: event.target.value } : t))
  }

  const handleShow = (prop) => {
    setProperty(prop)
    document.querySelectorAll('.option').forEach(p => p.style.background = 'none')
    document.querySelector(`.option.${prop}`).style.background =
      prop === 'trash'
        ? 'var(--trash)'
        : 'var(--nav-highlight)' 
  }

  const restoreTask = (id) => {
    const task = deleted.find(t => t.id === id)
    setDeleted(deleted.filter(t => t.id !== id))
    setTasks(tasks.concat(task))
  }

  const deletePermanent = (id) => {
    setDeleted(deleted.filter(t => t.id !== id))
  }

  const toggleDarkMode = () => setDarkMode(!darkMode)

  const tasksToShow = tasks.filter(t => {
    return (property === 'all' ? true : t[property]) &&
      t.name.toLowerCase().includes(filter.toLowerCase())
  })

  const deletedTasksToShow = deleted.filter(t =>
    t.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div data-theme={darkMode ? 'dark' : 'light'} className="outer-container">
      <Navigation
        searchVal={filter}
        searchHandler={handleFilterChange}
        navHandler={toggleNavigation}
        image={darkMode ? DailyDark : DailyLight}
        showHandler={handleShow}
        modeHandler={toggleDarkMode} />

      <div className="middle-container">
        <div className="ham-menu">
          <FontAwesomeIcon className="ham-icon" onClick={toggleNavigation} icon={faBars}
            size="lg" />
        </div>
        <TaskInput value={taskName} inputHandler={handleTaskChange}
          submitHandler={addTask} />
        <h2>Tasks</h2>
        {property === 'trash'
          ? <TaskTrash tasks={deletedTasksToShow}
              restoreHandler={restoreTask}
              deleteHandler={deletePermanent} />
          : <TaskList tasks={tasksToShow} checkHandler={handleCheck}
            removeHandler={removeTask}
            importanceHandler={toggleImportance}
            infoHandler={toggleInfo} />
        }
      </div>

      <TaskInfo task={info}
        closeHandler={toggleInfo}
        editHandler={handleEditChange}
        renameHandler={renameTask}
        dateHandler={handleDateChange} />
    </div>
  )
}

export default App