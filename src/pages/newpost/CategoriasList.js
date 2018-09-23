import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

import { fetchCategoryPost } from '../../actions/createPost';


class CategoriasList extends Component {

    token = localStorage.token;   

    validarToken() {        
        if (!this.token) {
            this.token = localStorage.token = Math.random().toString(36).substr(-8)    
        }
    }


    handleClick(category) {
        this.validarToken();
        this.props.fetchCategoryPost(category , this.token);
    }

    render() {
        const categorias = this.props.categorias;
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
