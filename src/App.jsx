import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"

import LoginForm from "./components/LoginForm"
import Navigation from "./components/Navigation"
import TaskInput from "./components/TaskInput"
import TaskList from "./components/TaskList"
import TaskInfo from "./components/TaskInfo"
import TaskTrash from "./components/TaskTrash"

import loginService from "./services/login"
import userService from "./services/users"
import taskService from "./services/tasks"

import defaultSort from "./utils/sort"

import DailyDark from "./assets/daily-dark.svg"
import DailyLight from "./assets/daily-light.svg"

import "./App.css"

const App = () => {
  const [tasks, setTasks] = useState([])
  const [property, setProperty] = useState('all')
  const [taskName, setTaskName] = useState('')
  const [filter, setFilter] = useState('')
  const [darkMode, setDarkMode] = useState(true)
  const [width, setWidth] = useState(window.innerWidth)
  const [info, setInfo] = useState(null)
  const [user, setUser] = useState(null)

  const login = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      setTasks(user.tasks)
      taskService.setToken(user.token)
      return { error: null }
    } catch (e) {
      return { error: e.response.data.error }
    }
  }

  const register = async (credentials) => {
    try {
      const user = await userService.register(credentials)
      setUser(user)
      taskService.setToken(user.token)
      return { error: null }
    } catch (e) {
      return { error: e.response.data.error }
    }
  }

  const logout = () => {
    setUser(null)
    window.localStorage.clear()
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setTasks(user.tasks)
      taskService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if (!user) return
    const fetchTasks = async () => {
      const initialTasks = await taskService.getAll(user.id)
      setTasks(initialTasks.sort(defaultSort))
    }

    fetchTasks()
  }, [user])

  useEffect(() => {
    if (!user) return
    window.addEventListener('resize', () => setWidth(window.innerWidth))
    toggleNavigation()
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

  if (!user) {
    return <LoginForm
      theme={darkMode ? 'dark' : 'light'}
      image={darkMode ? DailyDark : DailyLight}
      loginHandler={login}
      registerHandler={register} />  
  }

  const handleTaskChange = (event) => setTaskName(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  const handleCheck = async (id) => {
    const task = tasks.find(t => t.id === id)
    try {
      const updatedTask = await taskService.update(id,
          { ...task, done: !task.done })
      setTasks(tasks.map(t => t.id === id ? updatedTask : t).sort(defaultSort))
    } catch (e) {
      console.log(e)
    }
  }

  const addTask = async (event) => {
    event.preventDefault()
    const taskObj = {
      name: taskName
    }
    
    try {
      const createdTask = await taskService.create(taskObj)
      setTasks(tasks.concat(createdTask))
      setTaskName('')
      handleShow('all')
    } catch (e) {
      console.log(e)
    }
  }

  const removeTask = async (id) => {
    const task = tasks.find(t => t.id === id)
    try {
      const deletedTask = await taskService.update(id, {
        ...task, deleted: true
      })
      setTasks(tasks.map(t => t.id === id ? deletedTask : t))
      if (info.id === id) toggleInfo(id)
    } catch (e) {
      console.log(e)
    }
  }

  const toggleImportance = async (id) => {
    const task = tasks.find(t => t.id === id)
    try {
      const updatedTask = await taskService.update(id, {
        ...task, important: !task.important
      })
      setTasks(tasks.map(t => t.id === id ? updatedTask : t))
    } catch (e) {
      console.log(e)
    }
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

  const renameTask = async (event) => {
    event.preventDefault()
    const renamedTask = await taskService.update(info.id, { ...info })
    setTasks(tasks.map(t => t.id === info.id ? renamedTask : t))
  }

  const handleDateChange = async (event) => {
    setInfo({ ...info, dueDate: event.target.value })
    const updatedTask = await taskService.update(info.id, {
      ...info, dueDate: new Date(event.target.value).toISOString()
    })
    setTasks(tasks.map(t => t.id === info.id ? updatedTask : t))
  }

  const handleShow = (prop) => {
    setProperty(prop)
    document.querySelectorAll('.option').forEach(p => p.style.background = 'none')
    document.querySelector(`.option.${prop === 'deleted' ? 'trash' : prop}`).style.background =
      prop === 'deleted'
        ? 'var(--trash)'
        : 'var(--nav-highlight)' 
  }

  const restoreTask = async (id) => {
    const task = tasks.find(t => t.id === id)
    try {
      const restoredTask = await taskService.update(id, {
        ...task, deleted: false
      })
      setTasks(tasks.map(t => t.id === id ? restoredTask : t))
    } catch (e) {
      console.log(e)
    }
  }

  const deletePermanent = async (id) => {
    try {
      await taskService.remove(id)
      setTasks(tasks.filter(t => t.id !== id))
    } catch (e) {
      console.log(e)
    }
  }

  const toggleDarkMode = () => setDarkMode(!darkMode)

  const tasksToShow = tasks.filter(t => {
    return (property === 'all'
      ? !t.deleted
      : property !== 'deleted'
        ? t[property] && !t.deleted
        : t.deleted) &&
      t.name.toLowerCase().includes(filter.toLowerCase())
  })

  return (
    <div data-theme={darkMode ? 'dark' : 'light'} className="outer-container">
      <Navigation
        searchVal={filter}
        searchHandler={handleFilterChange}
        navHandler={toggleNavigation}
        image={darkMode ? DailyDark : DailyLight}
        showHandler={handleShow}
        modeHandler={toggleDarkMode}
        logoutHandler={logout} />

      <div className="middle-container">
        <div className="ham-menu">
          <FontAwesomeIcon className="ham-icon" onClick={toggleNavigation} icon={faBars}
            size="lg" />
        </div>
        <TaskInput value={taskName} inputHandler={handleTaskChange}
          submitHandler={addTask} />
        <h2>{user.name}'s Tasks</h2>
        {property === 'deleted'
          ? <TaskTrash tasks={tasksToShow}
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