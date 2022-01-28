import { getAvailablePropertyTypes } from "../../js/api";
import { useState } from "react";
import './SideBar.scss'

const SideBar = ({types, callback}) => {
  return (
    <div className="side-bar">
      <h4>Property types</h4>
      <div className="filter-container">
        <ul>
          {
            types.map(type =>
              <li
                key={type.value}
                className={type.selected ? 'selected' : ''}
                onClick={(event) => callback(event, type.value)}
              >
                {type.label}
              </li>
            )}
        </ul>
      </div>
    </div>
  )
}

export default SideBar
