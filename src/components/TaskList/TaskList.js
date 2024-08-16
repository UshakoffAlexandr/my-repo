import React from 'react'
import PropTypes from 'prop-types'

import Task from '../Task/Task.js'

import './taskList.css'

const TaskList = ({ tasks, onDeleted, onToggleDone, onStartTimer, onStopTimer, onEditingTask, onUpdateTask }) => {
  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onDeleted={() => onDeleted(task.id)}
          onToggleDone={() => onToggleDone(task.id)}
          onStartTimer={() => onStartTimer(task.id)}
          onStopTimer={() => onStopTimer(task.id)}
          onEditingTask={() => onEditingTask(task.id)}
          onUpdateTask={onUpdateTask}
        />
      ))}
    </ul>
  )
}

TaskList.defaultProps = {
  tasks: [],
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      done: PropTypes.bool,
      createdTime: PropTypes.instanceOf(Date),
      elapsed: PropTypes.number,
      running: PropTypes.bool,
    })
  ),
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onStartTimer: PropTypes.func.isRequired,
  onStopTimer: PropTypes.func.isRequired,
  onEditingTask: PropTypes.func.isRequired,
  onUpdateTask: PropTypes.func.isRequired,
}

export default TaskList
