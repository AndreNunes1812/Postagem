import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { bindActionCreators } from "redux"
import { connect } from 'react-redux'
import NavMenu from '../navmenu/NavMenu'
import {
    fetchAddPost,
    fetchPosts,
    fetchPutPostId
} from './../../actions/createPost'

import { fetchCategorias } from '../../actions/categorias'

import {
    FormGroup,
    FormControl,
    ControlLabel,
    Row,
    Col,
    Panel,
    Button
} from 'react-bootstrap';

const divStyle = {
    background: "#eee",
    padding: "10px",
    margin: "15px"
};

const renderField = ({
    input,
    label,
    type,
    meta: { touched, error, warning }
}) => (
        <div className="form-group">
            <label htmlFor="">{label}</label>
            <input {...input} placeholder={label} type={type} className="form-control" />
            {touched &&
                ((error && <span className="text-danger">{error}</span>) || (warning && <span className="text-warning">{warning}</span>))}

        </div>
    )

const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': localStorage.token
}

let id = ''

class CreatePostFilho extends Component {

    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props, context) {
        super(props, context);
        this.state = { loading: true, update: false, post: { id: '1234' + Math.round(Math.random() * 10000000000000), timestamp: Date.now(), title: '', author: '', body: '', category: '', voteScore: 1, commentCount: 0, deleted: false } }

        this.handlerLink = this.handlerLink.bind(this)
        this.handlerClick = this.handlerClick.bind(this)
        this.validateObject = this.validateObject.bind(this)
        this.validarToken = this.validarToken.bind(this)
    }

    token = localStorage.token;

    componentDidMount() {
        this.validarToken();
        if ( this.props.match !== undefined) {
            id = this.props.match.params.id
        } else { id = ''}
        
        this.props.fetchCategorias(headers)
        
        if (this.props.postagem !== undefined) {
            this.setState({ post: this.props.postagem })
            this.setState({ update: true })
           
        }
    }

    validarToken() {
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

    handlerLink() {
        this.validarToken();
        this.props.fetchPosts(headers)
        if (!this.state.update) {
            id = 1
        }
        if ((this.state.update) || (this.props.newPost === 'new')) {
            this.context.router.history.push('/')
        } else {
            this.context.router.history.push('/category/' + id/* localStorage.parentId*/)
        }
    }

    handlerClick() {
        this.validarToken();

        if (!this.state.update) {
            this.props.fetchAddPost(this.state.post, this.token)
            id = 1
        } else {
            let value = { title: this.state.post.title, body: this.state.post.body }
            this.props.fetchPutPostId(value, this.token, this.state.post.id)
        }
        this.handlerLink();
    }

    render() {
        const { onChangeName, categorias } = this.props;
        return (
            <div className="container">
                <NavMenu />
                <Fragment>
                    <form >
                        <Panel style={divStyle} bsStyle="success">
                            <Panel.Heading >
                                <Panel.Title componentClass="h3">Informações do Post </Panel.Title>
                            </Panel.Heading>
                            <Panel.Body >
                                <Row className="show-grid" >
                                    <Col xs={6} md={6}>
                                        <FormGroup controlId="formControlsTitulo">
                                            <ControlLabel>Titulo</ControlLabel>
                                            <FormControl
                                                autoFocus
                                                name="post.title"
                                                type="text"
                                                component={renderField}
                                                onChange={onChangeName}
                                                className="form-control"
                                                placeholder="Titulo"
                                                value={this.state.post.title}
                                                onChange={(e) => {
                                                    let value = e.target.value
                                                    this.setState(prevState => {
                                                        return { post: { ...prevState.post, title: value } }
                                                    });
                                                }}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col xs={6} md={6}>
                                        <FormGroup controlId="formControlsAuthor">
                                            <ControlLabel>Autor</ControlLabel>
                                            <FormControl
                                                name="post.author"
                                                type="text"
                                                component={renderField}
                                                onChange={onChangeName}
                                                readOnly={this.state.update}
                                                className="form-control"
                                                placeholder="Author"
                                                value={this.state.post.author}
                                                onChange={(e) => {
                                                    let value = e.target.value
                                                    this.setState(prevState => {
                                                        return { post: { ...prevState.post, author: value } }
                                                    });
                                                }}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row >
                                <Row className="show-grid" >
                                    <Col xs={6} md={6}>
                                        <FormGroup controlId="formControlsTextarea">
                                            <ControlLabel>Comentário</ControlLabel>
                                            <FormControl
                                                name="post.body"
                                                componentClass="textarea"
                                                onChange={onChangeName}
                                                className="form-control"
                                                placeholder="Comentário"
                                                value={this.state.post.body}
                                                onChange={(e) => {
                                                    let value = e.target.value
                                                    this.setState(prevState => {
                                                        return { post: { ...prevState.post, body: value } }
                                                    });
                                                }}
                                            />
                                        </FormGroup>
                                    </Col>
                                    {!this.state.update ? (<div>
                                        <Col xs={6} md={6}>
                                            <FormGroup controlId="formControlsCategorias">
                                                <ControlLabel>Categorias</ControlLabel>
                                                <Field
                                                    name="post.category"
                                                    type="select"
                                                    component="select"
                                                    className="form-control"
                                                    value={this.state.post.category}
                                                    onChange={(e) => {
                                                        let value = e.target.value
                                                        this.setState(prevState => {
                                                            return { post: { ...prevState.post, category: value } }
                                                        });
                                                    }}
                                                    placeholder="selecione" >
                                                    <option value="">Selecione</option>
                                                    {categorias === undefined ? (null) : (
                                                        categorias.map((categoria) =>
                                                            <option key={categoria.path} value={categoria.path}>{categoria.name}</option >
                                                        ))
                                                    }
                                                </Field>
                                            </FormGroup>
                                        </Col>
                                    </div>) : (<div>
                                        <Col xs={2} md={2}>
                                            <FormGroup controlId="formControlsCategorias">
                                                <ControlLabel>Categorias</ControlLabel>
                                                <FormControl
                                                    name="post.category"
                                                    readOnly={this.state.update}
                                                    type="select"
                                                    className="form-control"
                                                    value={this.state.post.category}
                                                    placeholder="selecione" >
                                                </FormControl>

                                            </FormGroup>
                                        </Col>
                                        <Col xs={2} md={1}>
                                            <FormGroup controlId="formControlsCategorias">
                                                <ControlLabel>Score</ControlLabel>
                                                <FormControl
                                                    name="post.voteScore"
                                                    readOnly={this.state.update}
                                                    type="text"
                                                    className="form-control"
                                                    value={this.state.post.voteScore}>
                                                </FormControl>
                                            </FormGroup>
                                        </Col>
                                        <Col xs={2} md={3}>
                                            <FormGroup controlId="formControlsCategorias">
                                                <ControlLabel>Quantidade de Comentário(s)</ControlLabel>
                                                <FormControl
                                                    name="post.voteScore"
                                                    readOnly={this.state.update}
                                                    type="text"
                                                    className="form-control"
                                                    value={this.state.post.commentCount}>
                                                </FormControl>
                                            </FormGroup>
                                        </Col>

                                    </div>)}
                                </Row >
                            </Panel.Body>
                            <Panel.Footer>
                                <Row className="show-grid" >
                                    <Col xs={2} md={6}>
                                        <FormGroup controlId="formControlsVoto">
                                            <Button bsStyle="primary" type="button" onClick={this.handlerClick}>Salvar</Button>
                                            <Button bsStyle="link" onClick={this.handlerLink}>Voltar</Button>
                                        </FormGroup>
                                    </Col>
                                </Row >
                            </Panel.Footer>
                        </Panel>
                    </form>
                </Fragment>
            </div>
        )
    }
}

CreatePostFilho.propTypes = {
    fetchPost: PropTypes.func.isRequired,
    fetchPutPostId: PropTypes.func.isRequired,
    fetchGetPost: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        categorias: state.categorias.categories,
        post: state.post,
        postId: state.postId,
        token: this.token,
        headers: this.headers,
        createPost: state.createPost
    }
}

const mapDispatchToProps = (dispatch) => {
    return (bindActionCreators({
        fetchAddPost: (post, token) => fetchAddPost(post, token),
        fetchPosts: (headers) => fetchPosts(headers),
        fetchCategorias: (headers) => fetchCategorias(headers),
        fetchPutPostId: (post, token, postId) => fetchPutPostId(post, token, postId)
    }, dispatch))
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(reduxForm({
    form: 'createPostFilho',
    enableReinitialize: true,
    //   validate,
    //   warn
})(CreatePostFilho));