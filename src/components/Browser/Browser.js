import React, { Component } from 'react'
import PropTypes from 'prop-types'

import WebView from 'react-electron-web-view'

import './Browser.css'

class Browser extends Component {
  componentDidMount() {
    this.props.receiveWebviewReference(this.webview)
  }

  render() {
    let webviewStyles = {
      display: 'block',
      height:  '100%',
      width:   '100%',
    }

    return (
      <div className="c-Browser">
        <WebView
          autosize
          onDidStopLoading={() => this.props.webviewLoadHandler()}
          onPageTitleUpdated={() => this.props.pageTitleUpdatedHandler()}
          ref={(webview) => {
            this.webview = webview
          }}
          src="https://projects.raspberrypi.org"
          style={webviewStyles}
        />
      </div>
    )
  }
}

Browser.propTypes = {
  receiveWebviewReference: PropTypes.func.isRequired,
  pageTitleUpdatedHandler: PropTypes.func.isRequired,
  webviewLoadHandler:      PropTypes.func.isRequired,
}

export default Browser
