/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactToPrint from 'react-to-print'

const Row = ({ billable: { id, hours, unit_price, total_cost } }) => (
    <tr>
        <td>{id}</td>
        <td>{hours}</td>
        <td>{unit_price}</td>
        <td>{total_cost}</td>
    </tr>
)

Row.propTypes = {
    billable: PropTypes.object.isRequired,
}

export default class InvoiceDialog extends Component {
    static propTypes = {
        project: PropTypes.object.isRequired
    }

    render() {
        const { project } = this.props

        return (
            <div ref={el => this.componentRef = el}>
                <div className="invoice__dialog-control text-right">
                    <ReactToPrint
                        trigger={() => <a>Print this</a>}
                        content={() => this.componentRef} />
                </div>

                <div className="invoice__dialog-inner">
                    <div className="text-left invoice__to">
                        <h3>Company: {project.name}</h3>
                    </div>

                    <table className="invoice__table">
                        <thead>
                            <tr>
                                <th>Employee ID</th>
                                <th>Number of Hours</th>
                                <th>Unit Price</th>
                                <th>Cost</th>
                            </tr>
                        </thead>

                        <tbody>
                            {project.billables.map(billable => 
                                <Row key={billable.id} {...{billable}} />)}
                        </tbody>

                        <tfoot>
                            <tr>
                                <td></td>
                                <td></td>
                                <td>Total</td>
                                <td>{project.billables.reduce((a, b) => a + b.total_cost, 0)}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        )
    }
}