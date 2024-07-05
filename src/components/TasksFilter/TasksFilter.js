import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './tasksFilter.css'

export default class TasksFilter extends Component {
  render() {
    const { notDoneCount, filterName, selectFilter, clearCompleted } = this.props
    return (
      <>
        <span className="todo-count">{notDoneCount} items left</span>
        <ul className="filters">
          <li>
            <button
              type="button"
              className={filterName === 'All' ? 'selected' : ''}
              onClick={() => selectFilter('All')}
            >
              All
            </button>
          </li>
          <li>
            <button
              type="button"
              className={filterName === 'Active' ? 'selected' : ''}
              onClick={() => selectFilter('Active')}
            >
              Active
            </button>
          </li>
          <li>
            <button
              type="button"
              className={filterName === 'Completed' ? 'selected' : ''}
              onClick={() => selectFilter('Completed')}
            >
              Completed
            </button>
          </li>
        </ul>
        <button type="button" className="clear-completed" onClick={clearCompleted}>
          Clear completed
        </button>
      </>
    )
  }
}

TasksFilter.defaultProps = {
  notDoneCount: 0,
  filterName: 'All',
}

TasksFilter.propTypes = {
  notDoneCount: PropTypes.number,
  filterName: PropTypes.string,
  selectFilter: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
}
