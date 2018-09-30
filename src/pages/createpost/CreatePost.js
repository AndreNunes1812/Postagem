import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { fetchAddPost, fetchPosts, fetchPutPostId } from './../../actions/createPost';
import NavMenu from '../navmenu/NavMenu';
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
    'Authorization': localStorage.token
}

class CreatePost extends Component {

    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props, context) {
        super(props, context);
        this.state = { update: false, post: { id: '1234' + Math.round(Math.random() * 10000000000000), timestamp: Date.now(), title: ' ', author: '', body: '', category: '', voteScore: 1, commentCount: 0, deleted: false } }

        this.handlerLink = this.handlerLink.bind(this);
        this.handlerClick = this.handlerClick.bind(this);
        this.validateObject = this.validateObject.bind(this)
    }

    token = localStorage.token;

    componentDidMount() {
        console.log('ComponenteDidMount', this.props.location.state)
        console.log('ComponenteDidMount 2', this.props.location.validateForm)
        console.log('ComponenteDidMount 3',  this.props.match)

        if (this.props.location.state !== undefined) {
            this.setState({ post: this.props.location.state.post })
            this.setState({ update: true })
        }
        this.props.fetchPosts(headers)
    }

    componentWillMount() {
        this.id = this.props.match
        console.log('componentWillMount 1', this.id )
       // this.atualizarParentId(this.id);

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
        if (localStorage.postagemList) {
            this.context.router.history.push('/')
        } else {
            this.context.router.history.push('/category/' + localStorage.parentId)
        }
    }

    handlerClick() {
        this.validarToken();
        console.log('this.state.update:', this.state.update);

        if (!this.state.update) {
            this.props.fetchAddPost(this.state.post, this.token)
        } else {
            let value = { title: this.state.post.title, body: this.state.post.body }
            this.props.fetchPutPostId(value, this.token, this.state.post.id)
        }
        this.handlerLink();
    }

    render() {
        const { onChangeName, categorias } = this.props;

        console.log('Update ....', this.state.update)
        console.log('State ....', this.props.location.state)
        console.log('Props....', this.props)
        console.log('post ....', this.props.post)
        console.log('postid ....', this.props.postId)


        console.log('validateForm....', this.props.location.validateForm)

        return (
            <div className="container">
                <NavMenu />
                {this.props.location.validateForm === undefined && this.props.location.state === undefined ? (this.props.history.push(`/error`)) : (
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
                )}
            </div>
        )
    }
}

CreatePost.propTypes = {
    fetchPost: PropTypes.func.isRequired,
    fetchPutPostId: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        categorias: state.categorias.categories,
        post: state.posts,
        postId: state.posts,
        token: this.token,
        headers: this.headers
    }
}

const mapDispatchToProps = (dispatch) => {
    return (bindActionCreators({
        fetchAddPost: (post, token) => fetchAddPost(post, token),
        fetchPosts: (headers) => fetchPosts(headers),
        fetchPutPostId: (post, token, postId) => fetchPutPostId(post, token, postId)
    }, dispatch))
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(reduxForm({
    form: 'createPost',
    enableReinitialize: true,
    //   validate,
    //   warn
})(CreatePost));
