import React, { Component } from 'react'
import { bindActionCreators } from "redux"
import { connect } from 'react-redux'
import { fetchAddComentarioPost, fetchUpdateComentarioPut } from '../../actions/comentarioPost'
import { fetchGetParentCommentId } from '../../actions/comentarioPost'
import { fetchPosts } from '../../actions/createPost'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import './modal-container.css'
import {
    Row,
    Col,
    FormGroup,
    FormControl,
    ControlLabel,
    Button,
    Modal
} from 'react-bootstrap'

class ModelForm extends Component {

    constructor(props, context) {
        super(props, context)

        this.state = {
            show: false,
            comment: { id: '', timestamp: '', body: '', author: '', parentId: "" },
            comentarioCount: 0,
            parentId: ''
        }

        this.headers = {
            'Content-Type': 'application/json',
            'Authorization': this.token
        }

        this.handleHide = this.handleHide.bind(this)
        this.handlerClickAdd = this.handlerClickAdd.bind(this)
        this.atualizarShow = this.atualizarShow.bind(this)
        this.atualizaBody = this.atualizaBody.bind(this)
        this.atualizarComentario = this.atualizarComentario.bind(this)
    }

    componentDidMount() {
        this.atualizarShow(this.props.show)
        this.atualizarComentario()
        if (this.props.son) {
            this.atualizaBody()
        }
    }

    handleHide() {
        this.atualizarShow(!this.props.show)
    }

    handlerClickAdd() {
        this.validarToken()
        this.atualizarComentario()

        if (this.props.son) {
            if (this.props.son) {
                let value = { id: this.props.postagem.id, timestamp: Date.now(), body: this.state.comment.body, author: this.state.comment.author, parentId: this.props.postagem.parentId }
                this.props.fetchUpdateComentarioPut(value, this.token, this.props.postagem.parentId)
            } else if (this.props.son === false) {
                this.props.fetchGetParentCommentId(this.state.comment.parentId, this.token)
            }
        } else {

            this.props.fetchAddComentarioPost(this.state.comment, this.token)
        }

        this.props.fetchPosts(this.headers)
        this.handleHide()
    }

    token = localStorage.token

    validarToken() {
        if (!this.token) {
            this.token = localStorage.token = Math.random().toString(36).substr(-8)
        }
    }

    atualizarShow(show) {
        this.setState({ show: show })
    }

    atualizaBody() {

        this.setState(
            {
                comment:
                {
                    ...this.state.comment,
                    body: this.props.postagem.body,
                    author: this.props.postagem.author
                }
            })
    }

    atualizarComentario() {
        this.setState(
            {
                comment:
                {
                    ...this.state.comment, id: '4321' + Math.round(Math.random() * 10000000000000),
                    parentId: this.props.postagem.id,
                    timestamp: Date.now()
                }
            })
    }

    token = localStorage.token

    render() {
        return (
            <div className="container" >
                <Modal
                    show={this.state.show}
                    onHide={this.handleHide}
                    container={this}
                    aria-labelledby="contained-modal-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">
                            Adcionar Comentários
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row className="show-grid" >
                            <Col xs={12} md={12}>
                                <FormGroup controlId="formControlsTitulo">
                                    <ControlLabel>Author</ControlLabel>
                                    <FormControl
                                        name="comment.author"
                                        type="text"
                                        className="form-control"
                                        placeholder="Author"
                                        value={this.state.comment.author}
                                        onChange={(e) => this.setState(
                                            {
                                                comment:
                                                    { ...this.state.comment, author: e.target.value }
                                            }
                                        )
                                        }
                                    />
                                </FormGroup>
                            </Col>
                            <Col xs={12} md={12}>
                                <FormGroup controlId="formControlsTitulo">
                                    <ControlLabel>Comentários</ControlLabel>
                                    <FormControl
                                        name="comment.body"
                                        type="text"
                                        componentClass="textarea"
                                        className="form-control"
                                        placeholder="Comentário"
                                        value={this.state.comment.body}
                                        onChange={(e) => this.setState(
                                            {
                                                comment:
                                                    { ...this.state.comment, body: e.target.value }
                                            }
                                        )
                                        }
                                    />
                                </FormGroup>
                            </Col>
                        </Row>

                    </Modal.Body>
                    <Modal.Footer>
                        <Row>
                            <Col xs={11} md={11}>
                                <Button bsStyle="primary" onClick={this.handlerClickAdd} >Salvar</Button>
                                <Button onClick={this.handleHide}>Voltar</Button>
                            </Col>

                        </Row>

                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}


ModelForm.propTypes = {
    fetchAddComentarioPost: PropTypes.func.isRequired,
    fetchGetParentCommentId: PropTypes.func.isRequired,
    fetchUpdateComentarioPut: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
    return {
        comment: state.comment,
        token: this.token,
        headers: this.headers,
        postagemComment: state,
        createPost: state.createPost,
        idEnvio: state.comment
    }
}

const mapDispatchToProps = (dispatch) => {
    return (bindActionCreators({
        fetchAddComentarioPost: (comment, token) => fetchAddComentarioPost(comment, token),
        fetchUpdateComentarioPut: (comment, token) => fetchUpdateComentarioPut(comment, token),
        fetchPosts: (headers) => fetchPosts(headers),
        fetchGetParentCommentId: (comment, token) => fetchGetParentCommentId(comment, token),
    }, dispatch))
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(reduxForm({
    form: 'modelForm',
    enableReinitialize: true,
    //   validate,
    //   warn
})(ModelForm))