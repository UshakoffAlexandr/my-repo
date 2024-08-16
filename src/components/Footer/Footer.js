import React from 'react'
import PropTypes from 'prop-types'

import TasksFilter from '../TasksFilter/TasksFilter.js'

import './footer.css'

const Footer = ({ notDoneCount, filterName, selectFilter, clearCompleted }) => {
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

Footer.defaultProps = {
  filterName: 'All',
}

Footer.propTypes = {
  notDoneCount: PropTypes.number.isRequired,
  filterName: PropTypes.string,
  selectFilter: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
}

export default Footer
