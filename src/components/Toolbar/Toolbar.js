import React from 'react'
import PropTypes from 'prop-types'

// import StarredProjectsDropdown from './StarredProjectsDropdown/StarredProjectsDropdown'

import './Toolbar.css'

const Toolbar = ({
  backButtonIsDisabled,
  forwardButtonIsDisabled,
  homeButtonIsDisabled,
  toolbarChromeButtonClickHandler,
  toolbarDockButtonClickHandler,
  toolbarNavigationButtonClickHandler,
  // isStarredProject,
  // navigateToPath,
  // toggleStarredProject,
  // removeStarredProject,
  // starredProjects,
}) =>
  <div className="c-Toolbar clearfix">
    <div className="c-Toolbar__navigation clearfix">
      <button
        className="c-Toolbar__button c-Toolbar__button--back"
        disabled={backButtonIsDisabled}
        onClick={() => toolbarNavigationButtonClickHandler('back')}
      >
        <span className="c-Toolbar__button-label">Go back</span>
      </button>

      <button
        className="c-Toolbar__button c-Toolbar__button--forward"
        disabled={forwardButtonIsDisabled}
        onClick={() => toolbarNavigationButtonClickHandler('forward')}
      >
        <span className="c-Toolbar__button-label">Go forwards</span>
      </button>

      <button
        className="c-Toolbar__button c-Toolbar__button--home"
        disabled={homeButtonIsDisabled}
        onClick={() => toolbarNavigationButtonClickHandler('home')}
      >
        <span className="c-Toolbar__button-label">Go home</span>
      </button>
    </div>

    {/* <button
      disabled={homeButtonIsDisabled}
      onClick={() => toggleStarredProject()}
    >{isStarredProject ? 'starred' : 'star'}</button>

    <StarredProjectsDropdown
      navigateToPath={navigateToPath}
      removeStarredProject={removeStarredProject}
      starredProjects={starredProjects}
    /> */}

    <div className="c-Toolbar__window-controls clearfix">
      <button
        className="c-Toolbar__button c-Toolbar__button--minimise"
        onClick={() => toolbarChromeButtonClickHandler('minimize')}
      >
        <span className="c-Toolbar__button-label">Minimize window</span>
      </button>

      <button
        className="c-Toolbar__button c-Toolbar__button--dock-left"
        onClick={() => toolbarDockButtonClickHandler('left')}
      >
        <span className="c-Toolbar__button-label">Dock window to left of screen</span>
      </button>

      <button
        className="c-Toolbar__button c-Toolbar__button--dock-right"
        onClick={() => toolbarDockButtonClickHandler('right')}
      >
        <span className="c-Toolbar__button-label">Dock window to right of screen</span>
      </button>

      <button
        className="c-Toolbar__button c-Toolbar__button--dock-full"
        onClick={() => toolbarDockButtonClickHandler('full')}
      >
        <span className="c-Toolbar__button-label">Make window fullscreen</span>
      </button>

      <button
        className="c-Toolbar__button c-Toolbar__button--close"
        onClick={() => toolbarChromeButtonClickHandler('close')}
      >
        <span className="c-Toolbar__button-label">Close window</span>
      </button>
    </div>
  </div>

Toolbar.propTypes = {
  backButtonIsDisabled:                PropTypes.bool.isRequired,
  forwardButtonIsDisabled:             PropTypes.bool.isRequired,
  homeButtonIsDisabled:                PropTypes.bool.isRequired,
  isStarredProject:                    PropTypes.bool.isRequired,
  navigateToPath:                      PropTypes.func.isRequired,
  removeStarredProject:                PropTypes.func.isRequired,
  starredProjects:                     PropTypes.object.isRequired,
  toggleStarredProject:                PropTypes.func.isRequired,
  toolbarChromeButtonClickHandler: PropTypes.func.isRequired,
  toolbarDockButtonClickHandler:       PropTypes.func.isRequired,
  toolbarNavigationButtonClickHandler: PropTypes.func.isRequired,
}

export default Toolbar
