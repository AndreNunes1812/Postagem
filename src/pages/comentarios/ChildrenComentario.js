import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { fetchRemovePostId, fetchVoteScore, fetchPosts } from '../../actions/createPost';
import { fetchGetParentCommentId } from '../../actions/comentarioPost';
import ViewPost from '../newpost/viewPost';
import ModelForm from '../model/ModelForm';

import {
    Panel,
    Row,
    Col,
    Button,
    Modal
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
        // this.id = '';

        this.headers = {
            'Content-Type': 'application/json',
            'Authorization': this.token
        }

        this.handlerLink = this.handlerLink.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.atualizarComent = this.atualizarComent.bind(this);
        this.atualizarParentId = this.atualizarParentId.bind(this);
        this.validarToken = this.validarToken.bind(this);
        // this.handleTrash = this.handleTrash.bind(this);
        // this.handleVoteScore = this.handleVoteScore.bind(this);
        // this.convertDate =  this.convertDate.bind(this);

    }

    componentDidMount() {
        this.setState({ id: this.props.location.state.commentId });
     //   console.log('ChildrenComentario :')
        // console.log('postagem:', this.props.location.postagem.id)
     //   console.log('children :', this.props.children)
        this.validarToken();
        this.atualizarParentId();
        this.comentarios = this.props.comentarios;

       // console.log('comentarios :', this.comentarios)
    }

    componentWillMount() {
        // console.log('TESTE do andre :', this.props.children)
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
            this.parentId = localStorage.parentId ;
        }, 1000);
    }

    validarToken() {
        if (!this.token) {
            this.token = localStorage.token =  Math.random().toString(36).substr(-8)
        }
    }

    handleClick() {
        console.log('this is:');
        this.setState({ show: true });
    }

    token = localStorage.token;
    parentId = localStorage.parentId;
    vote = "filho";

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

        //this.props.fetchPosts(this.headers);

        setTimeout(() => {
            this.context.router.history.push('/');
        }, 1000);

    }

    // convertDate( data ) {
    //     return new Intl.DateTimeFormat('pt-BR', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(data);
    // }

    render() {

        let postagem = [] //this.props.comentarios;

        console.log('localStorage.parentId',localStorage.parentId)
        
        console.log('this.props.comentarios',this.props.comentarios)

        if (this.props.comentarios === undefined) {
            console.log('indefinidos')
        } else {
           postagem = this.props.comentarios.filter( post => post.parentId === localStorage.parentId)
        }
           
        console.log('Comentarios this.props.children:', this.props.children);
        console.log('Comentarios postagem:', postagem);

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
                                        <ViewPost postagem={post} desabilitarBotoes={false}  vote={this.vote} />

                                    </li>
                                    ))}</div>
                                )
                            }
                        </ul>
                    </Panel.Body>
                    {/* <Panel.Footer>
                        <Button bsStyle="primary" type="button" onClick={this.toggleModal}>Adcionar Comentário</Button>
                        <Button bsStyle="link" onClick={this.handlerLink}>Voltar</Button>
                    </Panel.Footer> */}
                </Panel>
                {/* {this.state.show ? (
                    <ModelForm 
                        show={this.state.show} 
                        postagem = {postagem}  
                        headers={this.headers} 
                        onClose={this.toggleModal}
                        token={this.token} />
                ) : ( null )
                } */}

            </div>
        );
    }
}


ChildrenComentario.propTypes = {
    // fetchRemovePostId: PropTypes.func.isRequired,
    // fetchVoteScore: PropTypes.func.isRequired,
    fetchPosts: PropTypes.func.isRequired,
    fetchGetParentCommentId: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {

    console.log('** ChildrenComentario state **:', state);

    console.log('** ChildrenComentario parentId **:', this.parentId);

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

