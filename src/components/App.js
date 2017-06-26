import React, { Component } from 'react'
import Browser from './Browser/Browser.js'
import Toolbar from './Toolbar/Toolbar.js'
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
      toolbarTitle: 'Raspberry Pi Projects',
    }

    browserWindow.setTitle(this.state.toolbarTitle)
  }

  browserHomeButtonHandler = () => {
    browserWindow.loadURL(this.state.defaultUrl)
  }

  dockButtonClickHandler = (position) => {
    if (position === 'full') {
      return browserWindow.maximize()
    }

    let screenHalfway = displayDimensions.width / 2 // eslint-disable-line no-magic-numbers

    browserWindow.setSize(screenHalfway, displayDimensions.height, true)

    if (position === 'left') {
      browserWindow.setPosition(0, 0, true)
    } else {
      browserWindow.setPosition(screenHalfway, 0, true)
    }

    return null
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
          browserHomeButtonHandler={this.browserHomeButtonHandler}
          dockButtonClickHandler={this.dockButtonClickHandler}
          title={this.state.toolbarTitle}
        />
        <Browser
          loadHandler={this.browserLoadHandler}
        />
      </div>
    )
  }
}

export default App
