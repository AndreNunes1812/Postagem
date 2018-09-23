import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { fetchCategorias } from '../../actions/categorias';
import { fetchPosts } from '../../actions/createPost';

import NavMenu from '../navmenu/NavMenu';
import CategoriasList from './CategoriasList';
import OrdenacaoLista from './OrdenacaoLista';
import ViewPost from './viewPost';

import { Panel, Row, Col, Button } from 'react-bootstrap';


class NewPost extends Component {

    constructor(props) {
        super(props)

        this.OnclickNovaPostagem  = this.OnclickNovaPostagem.bind(this)
        this.validarToken         = this.validarToken.bind(this)
        this.validarObjeto        = this.validarObjeto.bind(this)
    }

    static contextTypes = {
        router: PropTypes.object
    }

    componentDidMount() {
        this.validarToken();
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': this.token
        }
        this.props.fetchPosts(headers);
        this.props.fetchCategorias(headers);
        
    }

    token = localStorage.token;

    validarToken() {
        if (!this.token) {
            this.token = localStorage.token = Math.random().toString(36).substr(-8)
        }
    }

    validarObjeto(obj) {
        if (typeof obj !== 'undefined' && obj.length > 0) {
            return false;
        } else {
            return true;
        }
    }

    OnclickNovaPostagem() {
        this.props.history.push({
            pathname: '/post',
        })
    }

    render() {

        const categorias = this.props.categorias.categories
        const postagem = this.props.createPost.post;

        return (
            <div className="container">
                <NavMenu />
                <Row className="container">
                    <Col sm={10}>
                        <Panel bsStyle="success">
                            <Panel.Heading>
                                <Col sm={10}>
                                    <Panel.Title componentClass="h3">Postagens</Panel.Title>
                                </Col>
                                    <Col><Button bsStyle="link" onClick={this.OnclickNovaPostagem}>Nova Postagem</Button></Col>
                            </Panel.Heading>
                            <Panel.Body>
                                <ul>
                                    {(postagem === undefined || postagem.length === 0) ? (
                                        <div><h4><strong style={{ display: 'flex', justifyContent: 'center' }} >Não há postagem cadastrada</strong></h4></div>
                                    ) :
                                        (<div>{postagem.map(post =>
                                            (<li key={post.id} style={{ listStyleType: "none" }}>
                                                <ViewPost postagem={post} 
                                                    desabilitarBotoes={true} 
                                                    trashID={true} 
                                                    enabledPencil={true}
                                                    enabledTrash={true}/>
                                            </li>
                                            ))}</div>
                                        )
                                    }
                                </ul>

                            </Panel.Body>
                        </Panel>
                    </Col>
                    <Col sm={2} className="back-ground-css">
                        <Panel bsStyle="success">
                            <Panel.Heading>
                                <Panel.Title componentClass="h3">Categorias</Panel.Title>
                            </Panel.Heading>
                            <CategoriasList categorias={categorias} />
                        </Panel>
                    </Col>
                    {this.validarObjeto(postagem) ? (null) : (
                        <Col sm={2} className="back-ground-css">
                            <Panel bsStyle="success" >
                                <Panel.Heading>
                                    <Panel.Title componentClass="h3">Ordenação</Panel.Title>
                                </Panel.Heading>
                                <OrdenacaoLista postagem={postagem} />
                            </Panel>
                        </Col>
                    )}
                </Row>
            </div>
        );
    }
}


NewPost.propTypes = {
    fetchCategorias: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    categorias: state.categorias,
    createPost: state.createPost,
});

export default connect(mapStateToProps, { fetchCategorias, fetchPosts })(withRouter(NewPost));