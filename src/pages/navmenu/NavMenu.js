import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';


class NavMenu extends Component {

  constructor() {
    super()

    this.clicked = this.clicked.bind(this);

  }

  clicked(e) {
    console.log('sfsfdsfsd', e)
    e.preventDefault()
    this.context.router.history.push('/');
  }

  render() {

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
}

export default NavMenu



