/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Dialog from './Dialog'
import InvoiceDialog from './InvoiceDialog'

export default class ResultItem extends Component {
  static propTypes = {
    project: PropTypes.object.isRequired
  }

  _viewInvoice = () => {
    const { project } = this.props

    return Dialog.Open(
      <InvoiceDialog 
        className="invoice__dialog" 
        {...{project}} />)
  }

  render() {
    const { project } = this.props
    
    return (
      <div className="result__item">
        <div className="row">
          <div className="col" data-vertical_center>
            {/* istanbul-ignore-next */}
            {project.name} ({project.billables.length} Billables)
          </div>
          
          <div className="col-auto" data-vertical_center>
            <div className="result__options">
              <a 
                onClick={this._viewInvoice}>View</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}