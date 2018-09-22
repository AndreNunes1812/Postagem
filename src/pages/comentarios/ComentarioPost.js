import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { fetchRemovePostId, fetchVoteScore, fetchPosts } from '../../actions/createPost';
import { fetchGetParentCommentId , fetchVoteCommentScore } from '../../actions/comentarioPost';
import ViewPost from '../newpost/viewPost';
import ModelForm from '../model/ModelForm';
import ChildrenComentario from '../comentarios/ChildrenComentario';

import {
    Panel,
    Row,
    Col,
    Button,
    Modal
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
        // this.handleTrash = this.handleTrash.bind(this);
        // this.handleVoteScore = this.handleVoteScore.bind(this);
        // this.convertDate =  this.convertDate.bind(this);

    }

    componentDidMount() {
        this.setState({ id: this.props.location.state.commentId });
        console.log('postagem:', this.props.location.postagem.id)
        console.log('state id :', this.state.parentId)

        this.parentId = localStorage.parentId = this.props.location.postagem.id;

        console.log('atualizarParentId id :', this.parentId)
    }

    componentWillMount() {
        this.atualizarParentId();
    }

    toggleModal = () => {
        this.setState({
            show: !this.state.show,
            countComment: this.state.countComment++
            
        });
    }

    atualizarComent(updatestate) {
        this.setState({
            commentId: updatestate

        })
        console.log('Update State:', this.state.commentId)
    }

    atualizarParentId() {
        setTimeout(() => {
            console.log('atualizarParentId:', this.parentId)
            this.props.fetchGetParentCommentId(this.parentId, this.token);
        }, 2000);
    }

    validarToken() {
        if (!this.token) {
            this.token = localStorage.token = Math.random().toString(36).substr(-8)
        }
    }

    handleClick() {
        console.log('this is:');
        this.setState({ show: true });
    }

    token = localStorage.token;
    parentId = localStorage.parentId;

    // handleTrash(deleteID) {
    //     console.log('deleted:', deleteID);
    //     this.validarToken();
    //     this.props.fetchRemovePostId(deleteID , this.token);  
    // }

    // handleVoteScore(postId , voteScore) {
    //     this.validarToken();
    //     console.log('VoteScore:', postId, voteScore);
    //     this.props.fetchVoteScore(postId , this.token, voteScore );
    // }

    handlerLink() {

        this.validarToken();

        console.log('headers:', this.headers)

        this.props.fetchPosts(this.headers);

        setTimeout(() => {
            this.context.router.history.push('/');
        }, 1000);

    }

    // convertDate( data ) {
    //     return new Intl.DateTimeFormat('pt-BR', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(data);
    // }

    render() {

        console.log('Comentarios createPost:', this.props.location.state.commentId);

        let postagem = this.props.createPost.post.filter(post => post.id === this.props.location.state.commentId)[0]

        console.log('Comentarios:', postagem);
        console.log('Comentarios this.state.id:', this.state.id);

        return (
            <div>
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
                            <ViewPost postagem={postagem} comentarios={true} desabilitarBotoes={true} />
                        </Panel.Body>
                        <Panel.Footer>
                            <Button bsStyle="primary" type="button" onClick={this.toggleModal}>Adcionar Comentário</Button>
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
                {console.log('ComentarioPost: ChildrenComentario')}
                <ChildrenComentario children={this.parentId} desabilitarBotoes={false} />
            </div>
        );
    }
}


ComentarioPost.propTypes = {
    // fetchRemovePostId: PropTypes.func.isRequired,
    // fetchVoteScore: PropTypes.func.isRequired,
    fetchPosts: PropTypes.func.isRequired,
    fetchGetParentCommentId: PropTypes.func.isRequired,
    fetchVoteCommentScore: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {

    console.log('** state comentarios **:', state);

    console.log('** parentId comentarios**:', this.parentId);

    console.log('** props comentarios**:', this.props);
    

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
        fetchVoteCommentScore: (post, token, voteScore) => fetchVoteCommentScore (post, token, voteScore),
        fetchGetParentCommentId: (parentId, token) => fetchGetParentCommentId(parentId, token),
    }, dispatch))
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ComentarioPost));

