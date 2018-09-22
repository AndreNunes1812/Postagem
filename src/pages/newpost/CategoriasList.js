import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Row, Col } from 'react-bootstrap';

import { fetchCategoryPost } from '../../actions/createPost';


class CategoriasList extends Component {

    constructor(props) {
        super(props)
    }

    token = localStorage.token;   

    validarToken() {        
        if (!this.token) {
            this.token = localStorage.token = Math.random().toString(36).substr(-8)    
        }
    }


    handleClick(category) {
        console.log('this is:', category);
        this.validarToken();
        this.props.fetchCategoryPost(category , this.token);
    }

    render() {
        const categorias = this.props.categorias;
        console.log('CategoriasList:', categorias)
        return (
            <div>
                <ul>
                    {categorias === undefined ? (null) :
                        (<div>{categorias.map(categoria =>
                            (<li key={categoria.path} style={{ listStyleType: "none" }}>
                                <Button onClick={(e) => this.handleClick(categoria.name)} bsStyle="link">{categoria.name}</Button>
                            </li>
                            ))}</div>
                        )

                    }

                </ul>
            </div>
        );
    }
}


const mapStateToProps = state => ({
   // todos: state.todos,
    createPost: state.createPost,
});

export default connect( mapStateToProps , {fetchCategoryPost} )(CategoriasList);
