import React from 'react'
import PropTypes from 'prop-types'

import './StarredProjectsDropdown.css'

const StarredProjectsDropdown = ({
  navigateToPath,
  removeStarredProject,
  starredProjects,
}) =>
  <ul className="c-StarredProjectsDropdown">
    {Object.keys(starredProjects).map((path, index) => {
      return (
        <li
          key={index}
        >
          <span onClick={() => navigateToPath(path)}>
            {starredProjects[path]}
          </span>
          { }
          -
          { }
          <span onClick={() => removeStarredProject(path)}>remove</span>
        </li>
      )
    })}
  </ul>

StarredProjectsDropdown.propTypes = {
  navigateToPath:       PropTypes.func.isRequired,
  removeStarredProject: PropTypes.func.isRequired,
  starredProjects:      PropTypes.object.isRequired,
}

export default StarredProjectsDropdown
