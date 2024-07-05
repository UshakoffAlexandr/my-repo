import React, { Component } from 'react'

import NewTaskForm from './components/NewTaskForm/NewTaskForm.js'
import TaskList from './components/TaskList/TaskList.js'
import Footer from './components/Footer/Footer.js'
import './app.css'
import './index.css'

export default class App extends Component {
  state = {
    tasks: [
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
    ],
    filterName: 'All',
    timerInterval: null,
  }

  updateTimers = () => {
    this.setState(({ tasks, timerInterval }) => {
      let newTasks = tasks.map((task) => {
        if (task.running) {
          if (task.elapsed <= 0) {
            return { ...task, running: false, elapsed: 0 }
          }
          return { ...task, elapsed: task.elapsed - 1 }
        }
        return task
      })

      const allTimersStopped = newTasks.every((task) => !task.running)

      if (allTimersStopped && timerInterval) {
        clearInterval(timerInterval)
        return { tasks: newTasks, timerInterval: null }
      }

      return { tasks: newTasks }
    })
  }

  clearCompleted = () => {
    this.setState(({ tasks }) => {
      const newTasks = tasks.filter((task) => !task.done)
      return { tasks: newTasks }
    })
  }

  startTimer = (id) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => el.id === id)
      const newTasks = [...tasks]
      newTasks[idx] = { ...newTasks[idx], running: true }

      if (!this.state.timerInterval) {
        const timerInterval = setInterval(this.updateTimers, 1000)
        this.setState({ timerInterval })
      }

      return { tasks: newTasks }
    })
  }

  stopTimer = (id) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => el.id === id)
      const newTasks = [...tasks]
      newTasks[idx] = { ...newTasks[idx], running: false }

      if (newTasks.every((task) => !task.running)) {
        clearInterval(this.state.timerInterval)
        this.setState({ timerInterval: null })
      }

      return { tasks: newTasks }
    })
  }

  onToggleDone = (id) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => el.id === id)
      const newTasks = [...tasks]
      newTasks[idx] = { ...newTasks[idx], done: !newTasks[idx].done }
      return { tasks: newTasks }
    })
  }

  editingTask = (id) => {
    const { tasks } = this.state
    const index = tasks.findIndex((el) => el.id === id)
    const oldItem = tasks[index]
    const newItem = {
      ...oldItem,
      editing: !oldItem.editing,
    }
    const before = tasks.slice(0, index)
    const after = tasks.slice(index + 1)
    this.setState(() => ({
      tasks: [...before, newItem, ...after],
    }))
  }

  updateTask = (id, newText) => {
    const { tasks } = this.state
    const index = tasks.findIndex((el) => el.id === id)
    const oldItem = tasks[index]
    const newItem = {
      ...oldItem,
      text: newText,
      editing: false,
    }
    const before = tasks.slice(0, index)
    const after = tasks.slice(index + 1)
    this.setState(() => ({
      tasks: [...before, newItem, ...after],
    }))
  }

  deleteTask = (id) => {
    this.setState(({ tasks }) => {
      const newTasks = tasks.filter((el) => el.id !== id)
      return { tasks: newTasks }
    })
  }

  addTask = (text, sec = 600) => {
    this.setState(({ tasks }) => ({
      tasks: [
        ...tasks,
        { id: tasks.length + 1, text, done: false, createdTime: new Date(), elapsed: Number(sec), running: false },
      ],
    }))
  }

  selectFilter = (filterName) => {
    this.setState(() => ({ filterName }))
  }

  render() {
    const { tasks, filterName } = this.state
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
          <NewTaskForm onTaskAdded={this.addTask} />
        </header>
        <section className="main">
          <TaskList
            tasks={filteredTasks}
            onDeleted={this.deleteTask}
            onToggleDone={this.onToggleDone}
            onStartTimer={this.startTimer}
            onStopTimer={this.stopTimer}
            onEditingTask={this.editingTask}
            onUpdateTask={this.updateTask}
          />
          <Footer
            notDoneCount={notDoneCount}
            filterName={filterName}
            selectFilter={this.selectFilter}
            clearCompleted={this.clearCompleted}
          />
        </section>
      </section>
    )
  }
}
