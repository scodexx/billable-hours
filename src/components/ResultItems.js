import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ResultItem from './ResultItem'

class ResultItems extends Component {
  static propTypes = {
    projects: PropTypes.array.isRequired
  }

  render() {
    const { projects } = this.props

    return (
      <div className="result__items">
        {projects.map(project => 
          <ResultItem 
            key={project.name} {...{project}} />)}
      </div>
    )
  }
}

export default ResultItems