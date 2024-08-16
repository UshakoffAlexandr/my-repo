import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './newTaskForm.css'

const NewTaskForm = ({ onTaskAdded }) => {
  const [text, setText] = useState('')
  const [min, setMin] = useState('')
  const [sec, setSec] = useState('')

  const changeInputValue = (event) => {
    setText(event.target.value)
  }

  const changeInputMin = (event) => {
    const newValue = event.target.value
    setMin(newValue === '' ? '' : Math.max(0, newValue))
  }

  const changeInputSec = (event) => {
    const newValue = event.target.value
    setSec(newValue === '' ? '' : Math.max(0, Math.min(59, newValue)))
  }

  const submitTask = (event) => {
    event.preventDefault()

    if (text.trim() && (min || sec)) {
      onTaskAdded(text, (parseInt(min, 10) || 0) * 60 + (parseInt(sec, 10) || 0))
      setText('')
      setMin('')
      setSec('')
    }
  }

  return (
    <form className="header new-todo-form" onSubmit={submitTask}>
      <input
        className="new-todo"
        type="text"
        placeholder="What needs to be done"
        onChange={changeInputValue}
        value={text}
      />
      <input className="new-todo-form__timer" placeholder="Min" onChange={changeInputMin} value={min} type="number" />
      <input className="new-todo-form__timer" placeholder="Sec" onChange={changeInputSec} value={sec} type="number" />
      <button className="new-todo-form__button" type="submit" />
    </form>
  )
}

NewTaskForm.propTypes = {
  onTaskAdded: PropTypes.func.isRequired,
}

export default NewTaskForm
