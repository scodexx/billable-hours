import React, { Fragment, Component } from 'react'
import { Helmet } from 'react-helmet'

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Billable hours</title>
        </Helmet>
  
        <div className="App">
          The quick brown fox jumped over the lazy dog.
        </div>
      </Fragment>
    )
  }
}
