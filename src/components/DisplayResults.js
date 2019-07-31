/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import PropTyes from 'prop-types'

import ResultItems from './ResultItems'

const DisplayResults = ({ projects }) => (
    <div className="result__container">
        <div className="result__header">
            <h4>Generated Invoices <small>({projects.length})</small></h4>
        </div>

        <ResultItems {...{ projects }} />
    </div>
)

DisplayResults.propTypes = {
    projects: PropTyes.array.isRequired,
}

export default DisplayResults