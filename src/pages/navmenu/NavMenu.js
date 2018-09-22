import React , { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import CreatePost from '../createpost/CreatePost';

import { Navbar } from 'react-bootstrap';

  const divStyle = {
    listStyleType: "none" ,
    marginTop: "17px",
    fontWeight: 'bold'
  }

  class NavMenu extends Component {

    // onClick = (e, post) => {
    //   e.preventDefault();
    //   // console.log('Clicked in Redux Form', post);
    //   this.props.createName(post);
    // }
    // onChangeName = ({ target }) => {
    //   const { name, value } = target;
    //   // console.log('Target Input', name, value);
    // }

      render() {
        return (
          <div>
            <Route>
              <div className="container">
                <Navbar inverse>              
                  <Navbar.Header>
                    <Navbar.Brand>
                      <a href="#">Postagem de CONTEÚDO</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                  </Navbar.Header>
                  {/* <ul style={divStyle}>
                    <li>
                      <Link to="/post">Nova Postagem</Link>
                    </li>
                  </ul> */}
                </Navbar> 
              </div>          
            </Route>
            {/* <Route path="/post" 
              render={ () => < CreatePost  onClick={this.onClick}  onChangeName={this.onChangeName} />}  /> */}

          </div>
        );
      }


  }

  // const mapStateToProps = (state) => {
  //   return {
  //     initialValues: state.CreatePost
  //   }
  // }
  
  // const mapDispatchToProps = (dispatch) => {
  //   return {
  //     createName: (post) => dispatch(() => {}) // sendServer(data)
  //   }
  // }
  

  //export default connect(mapStateToProps,mapDispatchToProps)(NavMenu)

  export default NavMenu
