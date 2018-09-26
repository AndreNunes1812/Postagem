import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { fetchRemovePostId, fetchVoteScore, fetchPosts } from '../../actions/createPost';
import { fetchGetParentCommentId, fetchVoteCommentScore } from '../../actions/comentarioPost';
import ViewPost from '../newpost/viewPost';
import ModelForm from '../model/ModelForm';
import ChildrenComentario from '../comentarios/ChildrenComentario';
import NavMenu from '../navmenu//NavMenu';

import {
    Panel,
    Row,
    Col,
    Button
}
    from 'react-bootstrap';

class ComentarioPost extends Component {

    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props) {
        super(props)

        this.state = {
            show: false,
            post: { id: "", timestamp: "", title: "", body: "", author: "", voteScore: 0, commentCount: 0 },
            commentId: '',
            parentId: this.props.location.postagem.id
        }
        this.self = this;
        this.id = '';

        this.headers = {
            'Content-Type': 'application/json',
            'Authorization': this.token
        }

        this.handlerLink = this.handlerLink.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.atualizarComent = this.atualizarComent.bind(this);
        this.atualizarParentId = this.atualizarParentId.bind(this);
    }

    componentDidMount() {
        this.setState({ id: this.props.location.state.commentId });
        this.parentId = localStorage.parentId = this.props.location.postagem.id;
    }

    componentWillMount() {
        this.atualizarParentId();
    }

    toggleModal = () => {
        this.setState((prevState) => {
            return {
                show: !prevState.show
            }
        })
    }

    atualizarComent(updatestate) {
        this.setState({
            commentId: updatestate
        })
    }

    atualizarParentId() {
        this.props.fetchGetParentCommentId(this.parentId, this.token)
    }

    validarToken() {
        if (!this.token) {
            this.token = localStorage.token = Math.random().toString(36).substr(-8)
        }
    }

    handleClick() {
        this.setState({ show: true })
    }

    token = localStorage.token;
    parentId = localStorage.parentId;

    handlerLink() {
        this.validarToken();
        this.props.fetchPosts(this.headers)
        setTimeout(() => {
            this.context.router.history.push('/')
        }, 1000);
    }

    render() {

        let postagem = this.props.createPost.post.filter(post => post.id === this.props.location.state.commentId)[0]

        return (
            <div>
                <NavMenu />
                <div className="container" style={{ marginTop: 10 }}>
                    <Panel bsStyle="success">
                        <Panel.Heading >
                            <Panel.Title componentClass="h2">
                                <Row>
                                    <Col xs={8} md={8}>
                                        <strong>Comentários</strong>
                                    </Col>
                                </Row>
                            </Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>
                            <ViewPost
                                postagem={postagem}
                                comentarios={true}
                                trashID={true}
                                desabilitarBotoes={true}
                                ativarEdicao={true}
                                ativarLixeira={true} />
                        </Panel.Body>
                        <Panel.Footer>
                            <Button bsStyle="success" type="button" onClick={this.toggleModal}>Adcionar Comentário</Button>
                            <Button bsStyle="link" onClick={this.handlerLink}>Voltar</Button>
                        </Panel.Footer>
                    </Panel>
                    {this.state.show ? (
                        <ModelForm
                            show={this.state.show}
                            postagem={postagem}
                            headers={this.headers}
                            onClose={this.toggleModal}
                            token={this.token} />
                    ) : (null)
                    }

                </div>
                <ChildrenComentario
                    children={this.parentId}
                    desabilitarBotoes={false}
                    ativarEdicao={false}
                    ativarLixeira={true}
                />
            </div>
        );
    }
}


ComentarioPost.propTypes = {
    fetchPosts: PropTypes.func.isRequired,
    fetchGetParentCommentId: PropTypes.func.isRequired,
    fetchVoteCommentScore: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {

    return {
        post: state.posts,
        parentId: this.token,
        token: this.token,
        headers: this.headers,
        voteScore: this.voteScore,
        createPost: state.createPost,
    }
}

const mapDispatchToProps = (dispatch) => {
    return (bindActionCreators({
        fetchPosts: (headers) => fetchPosts(headers),
        fetchRemovePostId: (post, token) => fetchRemovePostId(post, token),
        fetchVoteScore: (post, token, voteScore) => fetchVoteScore(post, token, voteScore),
        fetchVoteCommentScore: (post, token, voteScore) => fetchVoteCommentScore(post, token, voteScore),
        fetchGetParentCommentId: (parentId, token) => fetchGetParentCommentId(parentId, token),
    }, dispatch))
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ComentarioPost));

