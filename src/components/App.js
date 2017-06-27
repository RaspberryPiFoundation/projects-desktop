import React, { Component } from 'react'
import Browser from './Browser/Browser'
import Toolbar from './Toolbar/Toolbar'
import './App.css'

const electron = window.require('electron')
const browserWindow = electron.remote.getCurrentWindow()
const screen = electron.screen
const display = screen.getPrimaryDisplay()
const displayDimensions = display.workAreaSize

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      defaultUrl:   'https://projects.raspberrypi.org',
      history:      [],
      toolbarTitle: 'Raspberry Pi Projects',
    }

    browserWindow.setTitle(this.state.toolbarTitle)
  }

  browserBackButtonHandler = () => {
    // this.iframe.contentWindow.history.back(-1)
  }

  browserForwardButtonHandler = () => {
    // this.iframe.contentWindow.history.back(1)
  }

  browserHomeButtonHandler = () => {
    this.webview.loadURL(this.state.defaultUrl)
  }

  webviewLoadHandler = () => {
    console.log('loaded')
    return null
  }

  dockButtonClickHandler = (position) => {
    if (position === 'full') {
      browserWindow.setPosition(0, 0)
      browserWindow.setSize(displayDimensions.width, displayDimensions.height)
      return
    }

    let screenHalfway = displayDimensions.width / 2 // eslint-disable-line no-magic-numbers

    browserWindow.setSize(screenHalfway, displayDimensions.height)

    if (position === 'left') {
      browserWindow.setPosition(0, 0)
    } else {
      browserWindow.setPosition(screenHalfway, 0)
    }

    return
  }

  receiveWebviewHandler = (webview) => {
    this.webview = webview
  }

  setToolbarTitleHandler = (toolbarTitle) => {
    this.setState({
      toolbarTitle: toolbarTitle,
    })
  }

  render() {
    return (
      <div className="App">
        <Toolbar
          browserBackButtonHandler={this.browserBackButtonHandler}
          browserForwardButtonHandler={this.browserForwardButtonHandler}
          browserHomeButtonHandler={this.browserHomeButtonHandler}
          dockButtonClickHandler={this.dockButtonClickHandler}
          title={this.state.toolbarTitle}
        />
        <Browser
          receiveWebviewHandler={this.receiveWebviewHandler}
          webviewLoadHandler={this.webviewLoadHandler}
        />
      </div>
    )
  }
}

export default App
