import React from 'react'
import PropTypes from 'prop-types'

const Toolbar = ({
  browserHomeButtonHandler,
  dockButtonClickHandler,
  title,
}) =>
  <div className="Toolbar">
    <button>Back</button>
    <button>Forward</button>
    <button onClick={() => browserHomeButtonHandler() }>Home</button>

    <span>{title}</span>

    <button onClick={() => dockButtonClickHandler('left')}>Dock Left</button>
    <button onClick={() => dockButtonClickHandler('full')}>Fullscreen</button>
    <button onClick={() => dockButtonClickHandler('right')}>Dock Right</button>
  </div>

Toolbar.propTypes = {
  browserHomeButtonHandler: PropTypes.func.isRequired,
  dockButtonClickHandler:   PropTypes.func.isRequired,
  title:                    PropTypes.string.isRequired,
}

export default Toolbar
