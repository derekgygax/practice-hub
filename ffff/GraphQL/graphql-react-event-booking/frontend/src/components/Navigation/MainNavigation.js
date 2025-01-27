import React, { useContext } from 'react';
import { AuthContext } from '../../context/auth-context';

// This makes it so it doesn't send back to the server
// but sees how the current page needs to change
import { NavLink } from 'react-router-dom';

import './MainNavigation.css';

export const MainNavigation = (props) => {
  const authContext = useContext(AuthContext);
  return (
    <header className='main-navigation'>
      <div className='main-navigation_logo'>
        <h1>EasyEvent</h1>
      </div>
      <nav className='main-navigation_items'>
        <ul>
          {!authContext.token && (
            <li>
              <NavLink to="/auth">
                Authenticate
              </NavLink>
            </li>
          )}
          <li>
            <NavLink to="/events">
              Events
            </NavLink>
          </li>
          {authContext.token && (
            <>
              <li>
                <NavLink to="/bookings">
                  Bookings
                </NavLink>
              </li>
              <li>
                <button
                  onClick={authContext.logout}
                >Logout</button>
              </li>
            </>
          )
          }
        </ul>
      </nav>
    </header>
  )
}
