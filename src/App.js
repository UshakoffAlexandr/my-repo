import React, { useState, useEffect } from 'react'

import NewTaskForm from './components/NewTaskForm/NewTaskForm.js'
import TaskList from './components/TaskList/TaskList.js'
import Footer from './components/Footer/Footer.js'
import './app.css'
import './index.css'

const App = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: 'Completed task',
      done: true,
      editing: false,
      createdTime: new Date(),
      elapsed: 0,
      running: false,
    },
    {
      id: 2,
      text: 'New task',
      done: false,
      editing: false,
      createdTime: new Date(),
      elapsed: 0,
      running: false,
    },
  ])
  const [filterName, setFilterName] = useState('All')
  const [timerInterval, setTimerInterval] = useState(null)

  useEffect(() => {
    if (tasks.some((task) => task.running) && !timerInterval) {
      const interval = setInterval(updateTimers, 1000)
      setTimerInterval(interval)
    } else if (!tasks.some((task) => task.running) && timerInterval) {
      clearInterval(timerInterval)
      setTimerInterval(null)
    }
  }, [tasks, timerInterval])

  const updateTimers = () => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.running ? { ...task, elapsed: Math.max(task.elapsed - 1, 0) } : task))
    )
  }

  const clearCompleted = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => !task.done))
  }

  const startTimer = (id) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? { ...task, running: true } : task)))
  }

  const stopTimer = (id) => {
    setTasks((prevTasks) => {
      const newTasks = prevTasks.map((task) => (task.id === id ? { ...task, running: false } : task))
      return newTasks
    })
  }

  const onToggleDone = (id) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task)))
  }

  const editingTask = (id) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? { ...task, editing: !task.editing } : task)))
  }

  const updateTask = (id, newText) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, text: newText, editing: false } : task))
    )
  }

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
  }

  const addTask = (text, sec = 600) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      {
        id: prevTasks.length + 1,
        text,
        done: false,
        createdTime: new Date(),
        elapsed: sec,
        running: false,
      },
    ])
  }

  const selectFilter = (filterName) => {
    setFilterName(filterName)
  }

  const notDoneCount = tasks.filter((task) => !task.done).length
  const filteredTasks = tasks.filter((task) => {
    switch (filterName) {
      case 'Active':
        return !task.done
      case 'Completed':
        return task.done
      default:
        return true
    }
  })

  return (
    <section className="todoapp">
      <header>
        <h1>todos</h1>
        <NewTaskForm onTaskAdded={addTask} />
      </header>
      <section className="main">
        <TaskList
          tasks={filteredTasks}
          onDeleted={deleteTask}
          onToggleDone={onToggleDone}
          onStartTimer={startTimer}
          onStopTimer={stopTimer}
          onEditingTask={editingTask}
          onUpdateTask={updateTask}
        />
        <Footer
          notDoneCount={notDoneCount}
          filterName={filterName}
          selectFilter={selectFilter}
          clearCompleted={clearCompleted}
        />
      </section>
    </section>
  )
}

export default App
