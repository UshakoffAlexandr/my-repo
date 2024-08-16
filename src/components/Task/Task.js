import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

import './task.css'

const Task = ({ task, onDeleted, onToggleDone, onStartTimer, onStopTimer, onEditingTask, onUpdateTask }) => {
  const [text, setText] = useState(task.text || '')

  useEffect(() => {
    setText(task.text)
  }, [task.text])

  const changeInputValue = (event) => {
    setText(event.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onUpdateTask(task.id, text)
    } else if (e.key === 'Escape') {
      onEditingTask(task.id)
      setText(task.text)
    }
  }

  const { id, done, createdTime, elapsed, editing } = task
  let classNames = ''
  let checked = false

  if (done) {
    classNames += ' completed'
    checked = true
  }

  if (editing) {
    return (
      <li key={id} className={classNames}>
        <div className="view">
          <input
            className="editing"
            type="text"
            placeholder="What needs to be done"
            onChange={changeInputValue}
            onKeyDown={handleKeyDown}
            value={text}
          />
        </div>
        <input type="text" className="edit" />
      </li>
    )
  } else {
    return (
      <li key={id} className={classNames}>
        <div className="view">
          <input id={id} className="toggle" type="checkbox" onChange={onToggleDone} checked={checked} />
          <label htmlFor={id}>
            <span className="title">{text}</span>
            <span className="description">
              <button className="icon icon-play" onClick={onStartTimer}></button>
              <button className="icon icon-pause" onClick={onStopTimer}></button>
              <span className="icon-span">{formatTime(elapsed)}</span>
            </span>
            <span className="created">created {formatDistanceToNow(createdTime, { includeSeconds: true })} ago</span>
          </label>
          <button type="button" aria-label="Edit" className="icon icon-edit" onClick={() => onEditingTask(id)} />
          <button type="button" aria-label="Destroy" className="icon icon-destroy" onClick={() => onDeleted(id)} />
        </div>
        <input type="text" className="edit" />
      </li>
    )
  }
}

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    done: PropTypes.bool,
    createdTime: PropTypes.instanceOf(Date),
    elapsed: PropTypes.number,
    running: PropTypes.bool,
    editing: PropTypes.bool,
  }).isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onStartTimer: PropTypes.func.isRequired,
  onStopTimer: PropTypes.func.isRequired,
  onEditingTask: PropTypes.func.isRequired,
  onUpdateTask: PropTypes.func.isRequired,
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

export default Task
