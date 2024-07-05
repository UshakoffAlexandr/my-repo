import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './newTaskForm.css'

export default class NewTaskForm extends Component {
  state = {
    text: '',
    min: '',
    sec: '',
  }

  changeInputValue = (event) => {
    this.setState({ text: event.target.value })
  }

  changeInputMin = (event) => {
    const newValue = event.target.value
    this.setState({ min: newValue === '' ? '' : Math.max(0, newValue) })
  }

  changeInputSec = (event) => {
    const newValue = event.target.value
    this.setState({ sec: newValue === '' ? '' : Math.max(0, Math.min(59, newValue)) })
  }

  submitTask = (event) => {
    event.preventDefault()
    const { text, min, sec } = this.state
    const { onTaskAdded } = this.props

    if (text.trim() && (min || sec)) {
      onTaskAdded(text, (parseInt(min, 10) || 0) * 60 + (parseInt(sec, 10) || 0))
      this.setState({
        text: '',
        min: '',
        sec: '',
      })
    }
  }

  render() {
    const { text, min, sec } = this.state

    return (
      <form className="header new-todo-form" onSubmit={this.submitTask}>
        <input
          className="new-todo"
          type="text"
          placeholder="What needs to be done"
          onChange={this.changeInputValue}
          value={text}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          onChange={this.changeInputMin}
          value={min}
          type="number"
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          onChange={this.changeInputSec}
          value={sec}
          type="number"
        />
        <button className="new-todo-form__button" type="submit" />
      </form>
    )
  }
}

NewTaskForm.propTypes = {
  onTaskAdded: PropTypes.func.isRequired,
}
