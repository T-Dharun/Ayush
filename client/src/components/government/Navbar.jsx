import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const a=JSON.parse(localStorage.getItem('data'));
  const addCl=a.role=='authority'?'Add Clerk':"";
  //console.log(a.role=='authority')
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/government">
                Workspace
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/approvedStartups">
                Approved Startups
              </NavLink>
            </li>
              <li className="nav-item">
              <NavLink className="nav-link" to="/government/create">
                {addCl}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
