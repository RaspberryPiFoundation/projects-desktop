import React from 'react'
import PropTypes from 'prop-types'

import StarredProjectsDropdown from './StarredProjectsDropdown/StarredProjectsDropdown'

import './Toolbar.css'

const Toolbar = ({
  backButtonIsDisabled,
  browserBackButtonHandler,
  browserForwardButtonHandler,
  browserHomeButtonHandler,
  dockButtonClickHandler,
  forwardButtonIsDisabled,
  homeButtonIsDisabled,
  isStarredProject,
  navigateToPath,
  title,
  toggleStarredProject,
  removeStarredProject,
  starredProjects,
}) =>
  <div className="c-Toolbar">
    <button
      disabled={backButtonIsDisabled}
      onClick={() => browserBackButtonHandler()}
    >Back</button>

    <button
      disabled={forwardButtonIsDisabled}
      onClick={() => browserForwardButtonHandler()}
    >Forward</button>

    <button
      disabled={homeButtonIsDisabled}
      onClick={() => browserHomeButtonHandler()}
    >Home</button>

    <span>{title}</span>

    <button
      disabled={homeButtonIsDisabled}
      onClick={() => toggleStarredProject()}
    >{isStarredProject ? 'starred' : 'star'}</button>

    <StarredProjectsDropdown
      navigateToPath={navigateToPath}
      removeStarredProject={removeStarredProject}
      starredProjects={starredProjects}
    />

    <button onClick={() => dockButtonClickHandler('left')}>Dock Left</button>
    <button onClick={() => dockButtonClickHandler('full')}>Fullscreen</button>
    <button onClick={() => dockButtonClickHandler('right')}>Dock Right</button>
  </div>

Toolbar.propTypes = {
  backButtonIsDisabled:        PropTypes.bool.isRequired,
  browserBackButtonHandler:    PropTypes.func.isRequired,
  browserForwardButtonHandler: PropTypes.func.isRequired,
  browserHomeButtonHandler:    PropTypes.func.isRequired,
  dockButtonClickHandler:      PropTypes.func.isRequired,
  forwardButtonIsDisabled:     PropTypes.bool.isRequired,
  homeButtonIsDisabled:        PropTypes.bool.isRequired,
  isStarredProject:            PropTypes.bool.isRequired,
  navigateToPath:              PropTypes.func.isRequired,
  removeStarredProject:        PropTypes.func.isRequired,
  starredProjects:             PropTypes.object.isRequired,
  title:                       PropTypes.string.isRequired,
  toggleStarredProject:        PropTypes.func.isRequired,
}

export default Toolbar
