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
      forwardButtonIsDisabled: true,
      starredProjects:         {},
      homeButtonIsDisabled:    true,
      toolbarTitle:            '',
    }
  }

  addStarredProject = () => {
    let starredProjects = this.state.starredProjects

    starredProjects[this.state.currentPath] = this.state.toolbarTitle

    this.setState({
      starredProjects: starredProjects,
    })
  }

  browserBackButtonHandler = () => {
    if (this.webview.canGoBack()) {
      this.webview.goBack()
      this.updateNavigationState()
    }
  }

  browserForwardButtonHandler = () => {
    if (this.webview.canGoForward()) {
      this.webview.goForward()
      this.updateNavigationState()
    }
  }

  browserHomeButtonHandler = () => {
    this.navigateToPath(defaultPath)
  }

  homeButtonIsDisabled = () => {
    return this.state.homeButtonIsDisabled
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
      toolbarTitle: pageTitle,
    })
  }

  receiveWebviewHandler = (webview) => {
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

  updateNavigationState = () => {
    this.setState({
      backButtonIsDisabled:    this.webview.canGoBack() === false,
      forwardButtonIsDisabled: this.webview.canGoForward() === false,
    })
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
      currentPath:          path,
      homeButtonIsDisabled: isHomePath,
      isStarredProject:     this.isStarredProject(path),
    }, () => this.updateNavigationState())

    return
  }

  render() {
    return (
      <div className="App">
        <Toolbar
          browserBackButtonHandler={this.browserBackButtonHandler}
          browserForwardButtonHandler={this.browserForwardButtonHandler}
          browserHomeButtonHandler={this.browserHomeButtonHandler}
          backButtonIsDisabled={this.state.backButtonIsDisabled}
          dockButtonClickHandler={this.dockButtonClickHandler}
          forwardButtonIsDisabled={this.state.forwardButtonIsDisabled}
          homeButtonIsDisabled={this.homeButtonIsDisabled()}
          isStarredProject={this.isStarredProject()}
          navigateToPath={this.navigateToPath}
          removeStarredProject={this.removeStarredProject}
          starredProjects={this.state.starredProjects}
          title={this.state.toolbarTitle}
          toggleStarredProject={this.toggleStarredProject}
        />
        <Browser
          pageTitleUpdatedHandler={this.pageTitleUpdatedHandler}
          receiveWebviewHandler={this.receiveWebviewHandler}
          webviewLoadHandler={this.webviewLoadHandler}
        />
      </div>
    )
  }
}

export default App
