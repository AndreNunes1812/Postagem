import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Panel, Row, Col } from 'react-bootstrap'
import ViewPost from './viewPost'
import NavMenu from '../navmenu/NavMenu'
import OrdenacaoList from '../newpost/OrdenacaoList'

import {
    fetchCategoryPost,
    fetchOrdenarDataPost,
    fetchOrdenarScorePost
} from '../../actions/createPost'

var divStyle = {
    background: "#eee",
    padding: "10px",
    margin: "15px"
}

class CategoriasList extends Component {

    constructor(props) {
        super(props)

        this.onClickVoltar = this.onClickVoltar.bind(this)
        this.validateObject = this.validateObject.bind(this)
        this.validateToken = this.validateToken.bind(this)
    }

    componentDidMount() {
        this.props.fetchCategoryPost(this.props.location.state.category, localStorage.token);
    }

    onClickVoltar() {
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

    render() {
        const postagem = this.props.createPost.post

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
                                                <Button bsStyle="link" onClick={this.onClickVoltar}>Voltar</Button>
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
}

const mapStateToProps = state => ({
    createPost: state.createPost
})

export default connect(mapStateToProps, { fetchCategoryPost, fetchOrdenarDataPost })(withRouter(CategoriasList))
