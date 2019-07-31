import React from 'react'

const NoResults = () => (
    <div className="centered">
        <div className="centered__content">
            <div className="text-center">
                No invoices to display.<br />
                Add a timesheet csv file to generate invoices<br />
                <a href="/static/files/billable.csv" download><u>Download csv sample</u></a>
                <div>Ensure you use exact file formatting</div>
            </div>
        </div>
    </div>
)

export default NoResults