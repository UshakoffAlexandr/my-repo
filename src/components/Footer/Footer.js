import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TasksFilter from '../TasksFilter/TasksFilter.js'

import './footer.css'

export default class Footer extends Component {
  render() {
    const { notDoneCount, filterName, selectFilter, clearCompleted } = this.props
    return (
      <div className="footer">
        <TasksFilter
          notDoneCount={notDoneCount}
          filterName={filterName}
          selectFilter={selectFilter}
          clearCompleted={clearCompleted}
        />
      </div>
    )
  }
}

Footer.defaultProps = {
  filterName: 'All',
}

Footer.propTypes = {
  notDoneCount: PropTypes.number.isRequired,
  filterName: PropTypes.string,
  selectFilter: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
}
