import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './Browser.css'

class Browser extends Component {
  componentDidMount = () => {
    this.props.setupIframeRef(this.iframe)
  }

  loadHandler = () => {
    this.props.loadHandler()
  }

  render() {
    return (
      <div className="Browser">
        <iframe
          className="Broswer__frame"
          height="100%"
          onLoad={this.loadHandler}
          ref={(iframe) => this.iframe = iframe}
          src="https://projects.raspberrypi.org"
          title="Projects Browser Frame"
          width="100%"
        />
      </div>
    )
  }
}

Browser.propTypes = {
  loadHandler:    PropTypes.func.isRequired,
  setupIframeRef: PropTypes.func.isRequired,
}

export default Browser
