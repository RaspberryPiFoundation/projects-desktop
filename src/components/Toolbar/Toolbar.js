import React from 'react'
import PropTypes from 'prop-types'

import './Toolbar.css'

const Toolbar = ({
  browserBackButtonHandler,
  browserForwardButtonHandler,
  browserHomeButtonHandler,
  dockButtonClickHandler,
  title,
}) =>
  <div className="c-Toolbar">
    <button onClick={() => browserBackButtonHandler()}>Back</button>
    <button onClick={() => browserForwardButtonHandler()}>Forward</button>
    <button onClick={() => browserHomeButtonHandler()}>Home</button>

    <span>{title}</span>

    <button onClick={() => dockButtonClickHandler('left')}>Dock Left</button>
    <button onClick={() => dockButtonClickHandler('full')}>Fullscreen</button>
    <button onClick={() => dockButtonClickHandler('right')}>Dock Right</button>
  </div>

Toolbar.propTypes = {
  browserBackButtonHandler:    PropTypes.func.isRequired,
  browserForwardButtonHandler: PropTypes.func.isRequired,
  browserHomeButtonHandler:    PropTypes.func.isRequired,
  dockButtonClickHandler:      PropTypes.func.isRequired,
  title:                       PropTypes.string.isRequired,
}

export default Toolbar
