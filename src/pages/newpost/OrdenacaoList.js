import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'

import { 
    fetchCategoryPost, 
    fetchOrdenarDataPost, 
    fetchOrdenarScorePost } from '../../actions/createPost'


const ordenacao = [
    {'name': 'Data' , 'id': 'data'},
    {'name': 'Score', 'id': 'vtso'}
]

class OrdenacaoList extends Component {

    token = localStorage.token

    validateToken() {        
        if (!this.token) {
            this.token = localStorage.token = Math.random().toString(36).substr(-8)    
        }
    }

    handleClick(category) {
         this.validateToken()
        console.log('cliquei:',this.props.postagem )
        //Ordenação por data
        if (category==='Data') {
            this.props.fetchOrdenarDataPost(this.props.postagem )
         } else {
            this.props.fetchOrdenarScorePost(this.props.postagem )
         }
    }

    render() {
        return (
            <div>
                <ul>
                    {ordenacao === undefined ? (null) :
                        (<div> {  ordenacao.map(ordem =>
                            (<li key={ordem.id} style={{ listStyleType: "none" }}>
                                <Button onClick={(e) => this.handleClick(ordem.name)} bsStyle="link">{ordem.name}</Button>
                            </li>
                            ))}</div>
                        )

                    }
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    createPost: state.createPost,
})

export default connect( mapStateToProps , {fetchCategoryPost, fetchOrdenarDataPost , fetchOrdenarScorePost} )(OrdenacaoList)