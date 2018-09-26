import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { fetchAddPost, fetchPosts } from './../../actions/createPost';
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

var divStyle = {
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

class CreatePost extends Component {

    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props, context) {
        super(props, context);

        this.state = { update: false, post: { id: '1234' + Math.round(Math.random() * 10000000000000), timestamp: Date.now(), title: '', author: '', body: '', category: '', voteScore: 1, deleted: false } }

        this.handlerLink = this.handlerLink.bind(this);
        this.handlerClick = this.handlerClick.bind(this);

        this.headers = {
            'Content-Type': 'application/json',
            'Authorization': this.token
        }
    }

    token = localStorage.token;

    validarToken() {
        if (!this.token) {
            this.token = localStorage.token = Math.random().toString(36).substr(-8)
        }
    }

    componentWillMount() {
        if (this.props.location.state !== undefined) {
            this.setState({ post: this.props.location.state.post });
            this.setState({ update: true });
        }
    }

    handlerLink() {
        this.validarToken();
        this.props.fetchPosts(this.headers);

        setTimeout(() => {
            this.context.router.history.push('/');
        }, 1000);

    }

    async handlerClick() {
        this.validarToken();

        const add = await this.props.fetchAddPost(this.state.post, this.token);
        const postAll = await this.props.fetchPosts(this.headers);
        this.handlerLink();
    }

    render() {
        const { onChangeName } = this.props;
        let categorias = this.props.categorias;
        return (

            <div className="container">
                <NavMenu />
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
                                            name="post.title"
                                            type="text"
                                            component={renderField}
                                            onChange={onChangeName}
                                            className="form-control"
                                            placeholder="Titulo"
                                            value={this.state.post.title}
                                            onChange={(e) => this.setState(
                                                {
                                                    post:
                                                        { ...this.state.post, title: e.target.value }
                                                }
                                            )
                                            }
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
                                            className="form-control"
                                            placeholder="Author"
                                            value={this.state.post.author}
                                            onChange={(e) => this.setState(
                                                {
                                                    post:
                                                        { ...this.state.post, author: e.target.value }
                                                }
                                            )
                                            }
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
                                            onChange={(e) => this.setState(
                                                {
                                                    post:
                                                        { ...this.state.post, body: e.target.value }
                                                }
                                            )
                                            }
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
                                                onChange={(e) => this.setState(
                                                    {
                                                        post:
                                                            { ...this.state.post, category: e.target.value }
                                                    }
                                                )
                                                }
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
                                    <Col xs={4} md={3}>
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
                                    <Col xs={3} md={3}>
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
            </div>
        );
    }
}

CreatePost.propTypes = {
    fetchPost: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
    return {
        categorias: state.categorias.categories,
        post: state.posts,
        token: this.token,
        headers: this.headers
    }
}

const mapDispatchToProps = (dispatch) => {
    return (bindActionCreators({
        fetchAddPost: (post, token) => fetchAddPost(post, token),
        fetchPosts: (headers) => fetchPosts(headers)
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
