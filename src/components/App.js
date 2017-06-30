import React, { Component } from 'react'

import Browser from './Browser/Browser'
import Toolbar from './Toolbar/Toolbar'

import './App.css'

const electron = window.require('electron')
const browserWindow = electron.remote.getCurrentWindow()
const screen = electron.screen
const display = screen.getPrimaryDisplay()
const displayDimensions = display.workAreaSize

const defaultPath = '/en/projects'
const defaultUrl = 'https://projects.raspberrypi.org'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      backButtonIsDisabled:    true,
      currentPath:             null,
      currentTitle:            '',
      forwardButtonIsDisabled: true,
      homeButtonIsDisabled:    true,
      mac:                     false,
      starredProjects:         {},
    }
  }

  componentDidMount() {
    browserWindow.setHasShadow(false)

    this.setState({
      mac: !browserWindow.hasShadow(),
    }, () => browserWindow.setHasShadow(true))
  }

  addStarredProject = () => {
    let starredProjects = this.state.starredProjects

    starredProjects[this.state.currentPath] = this.state.currentTitle

    this.setState({
      starredProjects: starredProjects,
    })
  }

  isStarredProject = () => {
    return this.state.currentPath in this.state.starredProjects
  }

  navigateToPath = (path) => {
    this.webview.loadURL(defaultUrl + path)
  }

  pageTitleUpdatedHandler = () => {
    let pageTitleFull = this.webview.getTitle()
    let pageTitleSplit = pageTitleFull.split(' | ')
    let pageTitle = pageTitleSplit[0]

    this.setState({
      currentTitle: pageTitle,
    })
  }

  receiveWebviewReference = (webview) => {
    this.webview = webview
  }

  removeStarredProject = (path) => {
    let starredProjects = this.state.starredProjects

    delete starredProjects[path]

    this.setState({
      starredProjects: starredProjects,
    })
  }

  toggleStarredProject = () => {
    if (this.isStarredProject()) {
      return this.removeStarredProject(this.state.currentPath)
    }

    return this.addStarredProject()
  }

  toolbarChromeButtonClickHandler = (action) => {
    if (action === 'close') {
      browserWindow.close()
    }

    if (action === 'minimize') {
      browserWindow.minimize()
    }
  }

  toolbarDockButtonClickHandler = (position) => {
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

  toolbarNavigationButtonClickHandler = (action) => {
    if (action === 'back' && this.webview.canGoBack()) {
      this.webview.goBack()
    }

    if (action === 'forward' && this.webview.canGoForward()) {
      this.webview.goForward()
    }

    if (action === 'home') {
      this.navigateToPath(defaultPath)
    }
  }

  webviewLoadHandler = () => {
    let url = this.webview.getURL()
    let lastSlash = url.indexOf('/', 8) // eslint-disable-line no-magic-numbers
    let path = url.substr(lastSlash)

    if (path === '/') {
      return
    }

    let isHomePath = path === defaultPath

    this.setState({
      backButtonIsDisabled:    this.webview.canGoBack() === false,
      currentPath:             path,
      forwardButtonIsDisabled: this.webview.canGoForward() === false,
      homeButtonIsDisabled:    isHomePath,
      isStarredProject:        this.isStarredProject(path),
    })

    return
  }

  render() {
    return (
      <div className={`c-App ${this.state.mac ? 'c-App--frameless' : 'c-App--framed'}`}>
        <Toolbar
          backButtonIsDisabled={this.state.backButtonIsDisabled}
          forwardButtonIsDisabled={this.state.forwardButtonIsDisabled}
          homeButtonIsDisabled={this.state.homeButtonIsDisabled}
          isStarredProject={this.isStarredProject()}
          navigateToPath={this.navigateToPath}
          removeStarredProject={this.removeStarredProject}
          starredProjects={this.state.starredProjects}
          toggleStarredProject={this.toggleStarredProject}
          toolbarChromeButtonClickHandler={this.toolbarChromeButtonClickHandler}
          toolbarDockButtonClickHandler={this.toolbarDockButtonClickHandler}
          toolbarNavigationButtonClickHandler={this.toolbarNavigationButtonClickHandler}
        />
        <Browser
          pageTitleUpdatedHandler={this.pageTitleUpdatedHandler}
          receiveWebviewReference={this.receiveWebviewReference}
          webviewLoadHandler={this.webviewLoadHandler}
        />
      </div>
    )
  }
}

export default App
