import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import ModelForm from '../model/ModelForm';
import { fetchRemovePostId, fetchVoteScore, fetchPosts } from '../../actions/createPost';
import { fetchRemoveCommentId, fetchVoteCommentScore } from '../../actions/comentarioPost';

import {
    Panel,
    Row,
    Col,
    FormGroup,
    FormControl,
    ControlLabel,
    Button,
    Glyphicon
}
    from 'react-bootstrap';


class ViewPost extends Component {

    constructor(props) {
        super(props)

        this.state = {
            show: false,
            son: false,
            countComment: 0
        }

        this.headers = {
            'Content-Type': 'application/json',
            'Authorization': this.token
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleComnentClick = this.handleComnentClick.bind(this);
        this.handleTrash = this.handleTrash.bind(this);
        this.handleVoteScore = this.handleVoteScore.bind(this);
        this.convertDate = this.convertDate.bind(this);
    }

    componentDidMount() {
        this.setState({ countComment: this.props.postagem.commentCount })
    }

    token = localStorage.token;

    toggleModal = () => {
        this.setState({
            show: !this.state.show,
            son: true
        });
    }

    validateToken() {
        if (!this.token) {
            this.token = localStorage.token = Math.random().toString(36).substr(-8)
        }
    }

    handleClick(categoryID) {
        this.props.history.push(`/post`);
    }

    handleComnentClick(commentID) {
        this.props.history.push({
            pathname: '/category/' + commentID,
            postagem: this.props.postagem,
            state: { commentId: commentID }
        })
    }

    handleTrash(deleteID) {
        this.validateToken();
        console.log('trashID', this.props.trashID)
        if (this.props.trashID) {
            //Varificar quando for postagem ou comentario para deletar
            this.props.fetchRemovePostId(deleteID, this.token);
            this.props.history.push(`/`);
        } else {
            // Codigo para remover Comentarios
            this.props.fetchRemoveCommentId(deleteID, this.token);
        }
        setTimeout(() => {
            this.props.fetchPosts(this.headers);
        }, 700);
    }

    handleVoteScore(postId, voteScore, vote, pai) {
        this.validateToken();
        if (vote === 'filho') {
            this.props.fetchVoteCommentScore(postId, this.token, voteScore, pai);
        } else {
            this.props.fetchVoteScore(postId, this.token, voteScore);
        }
    }

    convertDate(data) {
        return new Intl.DateTimeFormat('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(data);
    }

    render() {
        this.self = this.props;
        return (
            <div >
                <Panel bsStyle="success">
                    <Panel.Heading>
                        <Panel.Title componentClass="h2">
                            <Row>
                                <Col xs={8} md={8}>
                                    <strong> Título</strong> {this.props.postagem.title}
                                </Col>
                                <Col xs={2} md={4}>
                                    <strong>Data {this.convertDate(this.props.postagem.timestamp)} </strong>
                                </Col>
                            </Row>
                        </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        <Row>
                            <Col xs={12} md={12}>
                                <FormGroup controlId="formControlsTitulo">
                                    <ControlLabel>Comentário(s)</ControlLabel>
                                    <FormControl
                                        componentClass="textarea"
                                        value={this.props.postagem.body}
                                        className="form-control"
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row >
                            <Col xs={10} md={10}>
                                <FormGroup controlId="formControlsTitulo">
                                    <ControlLabel>Author</ControlLabel>
                                    <FormControl
                                        type="text"
                                        value={this.props.postagem.author}
                                        className="form-control"
                                        key={this.props.postagem.id}
                                    />
                                </FormGroup>
                            </Col>
                            {this.props.desabilitarBotoes ? (
                                <Col xs={2} md={2}>
                                    <FormGroup controlId="formControlsTitulo">
                                        <ControlLabel>Categoria</ControlLabel>
                                        {}
                                        <FormControl
                                            type="text"
                                            value={this.props.postagem.category}
                                            className="form-control"
                                        />
                                    </FormGroup>
                                </Col>) : (null)}
                         
                        </Row>
                    </Panel.Body>
                    {this.props.desativarFooter ? (null) : (
                        <Panel.Footer>
                            <Row>
                                <Col xs={6} md={6}>
                                    <FormGroup controlId="formControlsTitulo">
                                        <Button bsStyle="link" onClick={() => this.handleVoteScore(this.props.postagem.id, 'upVote', this.props.vote, this.props.postagem.parentId)}>
                                            <Glyphicon glyph="glyphicon glyphicon-hand-up" />
                                        </Button>
                                        <Button bsStyle="link" onClick={() => this.handleVoteScore(this.props.postagem.id, 'downVote', this.props.vote, this.props.postagem.parentId)}>
                                            <Glyphicon glyph="glyphicon glyphicon-hand-down" />
                                        </Button>
                                        {this.props.ativarEdicao ? (
                                            <Link to={{
                                                pathname: '/post',
                                                state: { post: this.props.postagem }
                                            }}
                                            > <Glyphicon glyph="glyphicon glyphicon-pencil" /> </Link>
                                        ) : (null)}
                                        {this.props.ativarLixeira ? (
                                            <Button bsStyle="link" onClick={() => this.handleTrash(this.props.postagem.id)}>
                                                <Glyphicon glyph="glyphicon glyphicon-trash" />
                                            </Button>
                                        ) : (null)}
                                    </FormGroup>
                                        {this.props.ativarVamosComentar ? (
                                            <Col xs={2} md={2}>
                                                <FormGroup controlId="formControlsTitulo" style={{ marginTop: 8 }}>
                                                    <Button bsStyle="success" onClick={() => this.handleComnentClick(this.props.postagem.id)}>Vamos comentar?</Button>
                                                </FormGroup>
                                            </Col>

                                        ) : (null)}
                                </Col>

                                {this.props.desabilitarBotoes ? (
                                    <Fragment>
                                        <Fragment>
                                            <Col xs={2} md={2}>
                                                <FormGroup controlId="formControlsTitulo" style={{ marginTop: 8 }}>
                                                    <Button
                                                        bsStyle="link"
                                                    > Comentários: {this.props.postagem.commentCount}
                                                    </Button>
                                                </FormGroup>
                                            </Col>
                                        </Fragment>
                                    </Fragment>) : (
                                        <Fragment  >
                                            <Col xs={2} md={2} style={{ marginTop: 8 }}>
                                                <Button bsStyle="success" type="button" onClick={this.toggleModal}>Editar Comentário</Button>
                                            </Col>
                                        </Fragment>
                                    )}
                                <Col xs={2} md={2}>
                                    <FormGroup controlId="formControlsTitulo" style={{ marginTop: 8 }}>
                                        <Button bsStyle="link">Score:{this.props.postagem.voteScore}</Button>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Panel.Footer>

                    )}

                </Panel>
                {this.state.show ? (
                    <ModelForm
                        show={this.state.show}
                        postagem={this.props.postagem}
                        headers={this.headers}
                        onClose={this.toggleModal}
                        token={this.token}
                        son={this.state.son} />
                ) : (null)
                }
            </div>
        );
    }
}


ViewPost.propTypes = {
    fetchRemovePostId: PropTypes.func.isRequired,
    fetchVoteScore: PropTypes.func.isRequired,
    fetchRemoveCommentId: PropTypes.func.isRequired,
    fetchVoteCommentScore: PropTypes.func.isRequired,
    fetchPosts: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
    return {
        post: state.posts,
        token: this.token,
        headers: this.headers,
        voteScore: this.voteScore,
        pai: this.pai,
    }
}

const mapDispatchToProps = (dispatch) => {
    return (bindActionCreators({
        fetchRemovePostId: (post, token) => fetchRemovePostId(post, token),
        fetchVoteScore: (post, token, voteScore) => fetchVoteScore(post, token, voteScore),
        fetchRemoveCommentId: (post, token) => fetchRemoveCommentId(post, token),
        fetchVoteCommentScore: (post, token, voteScore, pai) => fetchVoteCommentScore(post, token, voteScore, pai),
        fetchPosts: (headers) => fetchPosts(headers)
    }, dispatch))
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ViewPost));