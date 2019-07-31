/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import { Helmet } from 'react-helmet'

import Uploader from '../components/Uploader'
import DisplayResults from '../components/DisplayResults'
import NoResults from '../components/NoResults'

import { groupBillablesByProjects, transformBillable } from '../helpers/Billables'

export default class App extends Component {
  state = {
    projects: []
  }

  handleUploadStarted = () => {
    this.setState({
      projects: []
    })
  }
  handleUploadComplete = billables => {
    if(billables.length === 0) return alert('No billables found in file')

    this.setState({
      projects: groupBillablesByProjects(
        billables.map(transformBillable)
      )
    })
  }

  render() {
    const { projects } = this.state

    return (
      <>
        <Helmet>
          <title>Billable hours</title>
        </Helmet>
  
        <div className="app">
          <div className="app__contain--left">
              <Uploader
                uploadStarted={this.handleUploadStarted}
                uploadComplete={this.handleUploadComplete} />
          </div>

          <div className="app__contain--right">
            {projects.length > 0 ? 
              <DisplayResults 
                projects={projects} /> : 
                <NoResults />}
          </div>
        </div>
      </>
    )
  }
}