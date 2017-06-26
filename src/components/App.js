import React, { Component } from 'react'
import Browser from './Browser/Browser.js'
import Toolbar from './Toolbar/Toolbar.js'
import './App.css'

const electron = window.require('electron')
const browserWindow = electron.remote.getCurrentWindow()
const screen = electron.screen
const display = screen.getPrimaryDisplay()
const displayDimensions = display.workAreaSize;

// const fs = electron.remote.require('fs')
// const ipcRenderer = electron.ipcRenderer

class App extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      toolbarTitle: 'Raspberry Pi Projects',
    }
    
    browserWindow.setTitle(this.state.toolbarTitle)
  }

  componentDidMount = () => {
    
  }
  
  browserLoadHandler = () => {
    
  }
  
  browserNavigationHandler = () => {
    
  }
  
  dockButtonClickHandler = (position) => {
    let screenHalfway = displayDimensions.width / 2
    
    if (position === 'left' || position === 'full') {
      browserWindow.setPosition(0, 0)
    } else {
      browserWindow.setPosition(screenHalfway, 0)
    }
    
    if (position === 'left' || position === 'right') {
      browserWindow.setSize(screenHalfway, displayDimensions.height)
    } else {
      browserWindow.setSize(displayDimensions.width, displayDimensions.height)
    }
  }
  
  setToolbarTitleHandler = () => {
    
  }
  
  render() {
    return (
      <div className="App">
        <Toolbar
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
