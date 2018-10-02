import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Panel, Row, Col } from 'react-bootstrap'
import ViewPost from './viewPost'
import NavMenu from '../navmenu/NavMenu'
import OrdenacaoList from '../newpost/OrdenacaoList'
import { fetchCategorias } from '../../actions/categorias'

import {
    fetchCategoryPost,
    fetchOrdenarDataPost
} from '../../actions/createPost'


let headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.token
}

class CategoriasList extends Component {

    constructor(props) {
        super(props)

        this.onClickReturn = this.onClickReturn.bind(this)
        this.validateObject = this.validateObject.bind(this)
        this.validateToken = this.validateToken.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.callCategory = this.callCategory.bind(this)
    }

    componentDidMount() {
        this.props.fetchCategoryPost(this.props.match.params.id, localStorage.token);
        this.props.fetchCategorias(headers)
    }

    componentWillMount() {
        let id = this.props.match.params
        this.callCategory(id);
    }

    onClickReturn() {
        this.props.history.push({
            pathname: '/'
        })
    }

    validateToken() {
        if (!this.token) {
            this.token = localStorage.token = Math.random().toString(36).substr(-8)
        }
    }

    validateObject(obj) {
        if (typeof obj !== 'undefined' && obj.length > 0) {
            return false
        } else {
            return true
        }
    }

    callCategory(category) {
        this.props.fetchCategoryPost(category, localStorage.token);

    }

    handleClick(category) {
        this.props.history.push({
            pathname: `/${category}`
        })
        this.callCategory(category);

    }

    render() {
        const postagem = this.props.createPost.post
        const categorias = this.props.categorias.categories
        return (
            <div className="container">
                <Fragment>
                    <NavMenu />
                    <Row className="container">
                        <Col sm={10}>
                            <Panel bsStyle="success">
                                <Panel.Heading>
                                    <Panel.Title componentClass="h2">
                                        <Row>
                                            <Col xs={8} md={8}>
                                                <strong> Listagem de Categorias</strong>
                                            </Col>
                                            <Col xs={2} md={4}>
                                                <Button bsStyle="link" onClick={this.onClickReturn}>Voltar</Button>
                                            </Col>
                                        </Row>
                                    </Panel.Title>
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
                                                        trashID={false}
                                                        ativarEdicao={false}
                                                        ativarLixeira={false}
                                                        desativarFooter={true} />
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
                            </Panel>
                        </Col>
                        {this.validateObject(postagem) ? (null) : (
                            <Col sm={2} className="back-ground-css">
                                <Panel bsStyle="success" >
                                    <Panel.Heading>
                                        <Panel.Title componentClass="h3">Ordenação</Panel.Title>
                                    </Panel.Heading>
                                    <OrdenacaoList postagem={postagem} />
                                </Panel>
                            </Col>
                        )}

                    </Row>
                </Fragment>
            </div>
        )
    }
}

CategoriasList.propTypes = {
    fetchCategoryPost: PropTypes.func.isRequired,
    fetchOrdenarDataPost: PropTypes.func.isRequired,
    fetchCategorias: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    createPost: state.createPost,
    categorias: state.categorias,
})

export default connect(mapStateToProps, { fetchCategoryPost, fetchOrdenarDataPost, fetchCategorias })(withRouter(CategoriasList))