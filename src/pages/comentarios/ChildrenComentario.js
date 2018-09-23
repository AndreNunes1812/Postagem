import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { fetchRemovePostId, fetchVoteScore, fetchPosts } from '../../actions/createPost';
import { fetchGetParentCommentId } from '../../actions/comentarioPost';
import ViewPost from '../newpost/viewPost';

import {
    Panel,
    Row,
    Col
}
    from 'react-bootstrap';

class ChildrenComentario extends Component {

    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props) {
        super(props)

        this.state = {
            show: false,
            post: [{ id: "", timestamp: "", title: "", body: "", author: "", voteScore: 0, commentCount: 0 }],
            commentId: '',
            parentId: this.props.location.postagem.id,
        }

        this.self = this;
        this.headers = {
            'Content-Type': 'application/json',
            'Authorization': this.token
        }

        this.handlerLink = this.handlerLink.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.atualizarComent = this.atualizarComent.bind(this);
        this.atualizarParentId = this.atualizarParentId.bind(this);
        this.validarToken = this.validarToken.bind(this);
    }

    componentDidMount() {
        this.setState({ id: this.props.location.state.commentId });
        this.validarToken();
        this.atualizarParentId();
        this.comentarios = this.props.comentarios;
    }

    toggleModal = () => {
        this.setState({
            show: !this.state.show
        });
    }

    atualizarComent(updatestate) {
        this.setState({
            commentId: updatestate
        })
    }

    atualizarParentId() {
        setTimeout(() => {
            this.parentId = localStorage.parentId;
        }, 1000);
    }

    validarToken() {
        if (!this.token) {
            this.token = localStorage.token = Math.random().toString(36).substr(-8)
        }
    }

    handleClick() {
        this.setState({ show: true });
    }

    token = localStorage.token;
    parentId = localStorage.parentId;
    vote = "filho";

    handlerLink() {

        this.validarToken();
        setTimeout(() => {
            this.context.router.history.push('/');
        }, 1000);
    }

    render() {

        let postagem = [] 

        if (this.props.comentarios === undefined) {
        } else {
            postagem = this.props.comentarios.filter(post => post.parentId === localStorage.parentId)
        }

        return (
            <div className="container" style={{ marginTop: 30 }}>
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
                        <ul>
                            {(postagem === undefined || postagem.length === 0) ? (
                                <div><h4><strong style={{ display: 'flex', justifyContent: 'center' }} >Não há postagem cadastrada</strong></h4></div>
                            ) :
                                (<div>{postagem.map(post =>
                                    (<li key={post.id} style={{ listStyleType: "none" }}>
                                        <ViewPost
                                            postagem={post}
                                            desabilitarBotoes={false}
                                            vote={this.vote}
                                            enabledPencil={this.props.enabledPencil}
                                            enabledTrash={this.props.enabledTrash}
                                        />

                                    </li>
                                    ))}</div>
                                )
                            }
                        </ul>
                    </Panel.Body>
                </Panel>
            </div>
        );
    }
}


ChildrenComentario.propTypes = {
    fetchPosts: PropTypes.func.isRequired,
    fetchGetParentCommentId: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        post: state.posts,
        parentId: this.token,
        token: this.token,
        headers: this.headers,
        voteScore: this.voteScore,
        createPost: state.createPost,
        comentarios: state.comentarioPost.comment,

    }
}

const mapDispatchToProps = (dispatch) => {
    return (bindActionCreators({
        fetchPosts: () => fetchPosts(),
        fetchRemovePostId: (post, token) => fetchRemovePostId(post, token),
        fetchVoteScore: (post, token, voteScore) => fetchVoteScore(post, token, voteScore),
        fetchGetParentCommentId: (parentId, token) => fetchGetParentCommentId(parentId, token),
    }, dispatch))
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ChildrenComentario));

