import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

import { fetchCategoryPost, fetchOrdenarDataPost, fetchOrdenarScorePost } from '../../actions/createPost';


class OrdenacaoLista extends Component {

    constructor(props) {
        super(props);

        this.ordenacao = [
            {'name': 'Data' , 'id': 'data'},
            {'name': 'Score', 'id': 'vtso'}
        ]
    }

    token = localStorage.token;   

    validarToken() {        
        if (!this.token) {
            this.token = localStorage.token = Math.random().toString(36).substr(-8)    
        }
    }


    handleClick(category) {
         this.validarToken();

        //Ordenação por data
        if (category==='Data') {
            this.props.fetchOrdenarDataPost(this.props.postagem );
         } else {
            this.props.fetchOrdenarScorePost(this.props.postagem );
         }
    }

    render() {
        return (
            <div>
                <ul>
                    {this.ordenacao === undefined ? (null) :
                        (<div> {  this.ordenacao.map(ordem =>
                            (<li key={ordem.id} style={{ listStyleType: "none" }}>
                                <Button onClick={(e) => this.handleClick(ordem.name)} bsStyle="link">{ordem.name}</Button>
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

export default connect( mapStateToProps , {fetchCategoryPost, fetchOrdenarDataPost , fetchOrdenarScorePost} )(OrdenacaoLista);
