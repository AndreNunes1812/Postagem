import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Route, NavLink } from 'react-router-dom';

const NavMenu = () => {
  return (
    <div>
      <Route>
        <div className="container">
          <Navbar inverse>
            <Navbar.Header>
              <Navbar.Brand>
                <NavLink to="/" activeClassName="active">HOME</NavLink>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
          </Navbar>
        </div>
      </Route>
    </div>
  );
}
export default NavMenu