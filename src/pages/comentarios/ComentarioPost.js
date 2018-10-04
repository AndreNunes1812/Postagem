import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from "redux"
import { connect } from 'react-redux'
import { fetchRemovePostId, fetchVoteScore, fetchPosts } from '../../actions/createPost'
import { fetchGetParentCommentId, fetchVoteCommentScore } from '../../actions/comentarioPost'
import ViewPost from '../newpost/viewPost'
import ModelForm from '../model/ModelForm'
import FilhoComentario from '../comentarios/FilhoComentario'
import NavMenu from '../navmenu//NavMenu'


import {
    Panel,
    Row,
    Col,
    Button
}
    from 'react-bootstrap'

let id

class ComentarioPost extends Component {

    static contextTypes = {
        router: PropTypes.object
    }

    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': localStorage.token
    }
    
    token    = localStorage.token;
    parentId = localStorage.parentId;

    constructor(props) {
        super(props)

        this.state = {
            show: false,
            post: { id: "", timestamp: "", title: "", body: "", author: "", voteScore: 0, commentCount: 0 },
            commentId: '',
            parentId: ''
        }
        this.self = this
       // this.id = ''

        this.handlerLink = this.handlerLink.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.atualizarComent = this.atualizarComent.bind(this)
        this.atualizarParentId = this.atualizarParentId.bind(this)
    }

    componentWillMount() {
        id = this.props.match.params.id
        this.atualizarParentId(id)
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

    atualizarParentId(parentId) {       
        this.props.fetchGetParentCommentId(parentId, this.token)
        this.props.fetchPosts(this.headers)
    }

    validarToken() {
        if (!this.token) {
            this.token = localStorage.token = Math.random().toString(36).substr(-8)
        }
    }

    handleClick() {
        this.setState({ show: true })
    }

    handlerLink() {
        this.validarToken();
        this.props.fetchPosts(this.headers)
        this.context.router.history.push('/')
    }

    render() {

        let postagem = [] 
        if(this.props.createPost.post === undefined) {
        }else{
            postagem = this.props.createPost.post.filter(post => post.id === localStorage.parentId)[0]
        }

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
                                comentario={true}
                                trashID={true}
                                desabilitarBotoes={true}
                                ativarEdicao={true}
                                postagemEdicao={false}
                                ativarLixeira={true} />
                        </Panel.Body>
                        <Panel.Footer>
                            <Button bsStyle="success" type="button" onClick={this.toggleModal}>Vamos comentar?</Button>
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
                <FilhoComentario
                    children={localStorage.parentId}
                    desabilitarBotoes={false}
                    comentario={false}
                    ativarEdicao={false}
                    ativarLixeira={true}
                />
            </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ComentarioPost))