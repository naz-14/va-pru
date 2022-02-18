/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

export const NavItem = ({
  to = '/',
  label = 'Label',
  icon = 'fas-fa-circle',
  multiLevel = false,
  id,
}) => {
  const location = useLocation()
  const [rotate, setRotate] = useState(false)

  const handleRotate = () => {
    setRotate(!rotate)
  }

  return multiLevel ? (
    <>
      <li className={`nav-item`} onClick={() => handleRotate()}>
        <a
          href={`#Submenu${id}`}
          data-toggle="collapse"
          aria-expanded={location?.pathname.includes(to) ? 'true' : 'false'}
          className={`nav-link ${
            location?.pathname.includes(to) ? 'active' : ''
          }`}
        >
          <i className={`nav-icon ${icon}`}></i>
          <p>
            {label}
            <i
              className={
                rotate
                  ? 'right fas fa-angle-right toggle-up'
                  : 'right fas fa-angle-right toggle-down'
              }
            ></i>
          </p>
        </a>
        <ul
          className={`list-unstyled nav-item-list ${
            location?.pathname.includes(to) ? 'collapse show' : 'collapse'
          }`}
          id={`Submenu${id}`}
        >
          {multiLevel.map((item, idx) => (
            <li key={idx} className="nav-item">
              <NavLink
                exact
                to={item?.to}
                className={`nav-link`}
                activeClassName="active"
              >
                <i className={`${item.icon} nav-icon`}></i>
                <p>
                  {item?.label}
                  {item?.badge > 0 && (
                    <span className="badge badge-color right">
                      {item?.badge}
                    </span>
                  )}
                </p>
              </NavLink>
            </li>
          ))}
        </ul>
      </li>
    </>
  ) : (
    <li className="nav-item">
      <NavLink
        exact
        to={to}
        className={`nav-link ${location?.pathname.includes(to) && 'active'}`}
        activeClassName="active"
      >
        <i className={`nav-icon ${icon}`}></i>
        <p>{label}</p>
      </NavLink>
    </li>
  )
}

export default NavItem
