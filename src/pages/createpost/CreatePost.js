import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import { bindActionCreators } from "redux"
import { connect } from 'react-redux'
import CreatePostFilho from '../createpost/CreatePostFilho'
import {
    fetchPosts,
    fetchGetPost
} from './../../actions/createPost'

const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': localStorage.token
}

let id

class CreatePost extends Component {

    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props, context) {
        super(props, context);
        this.state = { loading: true, update: false, post: { id: '1234' + Math.round(Math.random() * 10000000000000), timestamp: Date.now(), title: ' ', author: '', body: '', category: '', voteScore: 1, commentCount: 0, deleted: false } }

        this.handlerLink = this.handlerLink.bind(this)
        this.handlerClick = this.handlerClick.bind(this)
        this.validateObject = this.validateObject.bind(this)
    }

    token = localStorage.token;

    componentDidMount() {
        this.validarToken();
        id = this.props.match.params.id
        if (this.props.location.state !== undefined) {
            this.setState({ post: this.props.location.state.post })
            this.setState({ update: true })
        }

        this.setState({ loading: false })
        this.props.fetchGetPost(id, this.token)
            .then(() => {
                const self = this;
                this.props.fetchPosts(headers)
                    .then(() => {
                        self.setState({ loading: false })
                    })
            })        
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
         if (id) {
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

        if (this.state.loading) {
            return <div>loading ...</div>;
        }
        else {

            if ((this.props.location.state !== undefined) || this.props.location.validateForm === "new") {
                return <div>< CreatePostFilho 
                    postagem = {this.props.location.validateForm === "new" ? (this.props.location.state) : (this.props.location.state.post)}
                    newPost  = {this.props.location.validateForm}
                  /></div>
            } else { 
                if (typeof this.props.createPost.post !== "undefined" && this.props.createPost.post !== null && this.props.createPost.post.length !== null && this.props.createPost.post.length >0) {
                    return <div>{this.context.router.history.push('/error')}</div>
                }
                else {
                    if (typeof this.props.createPost.post !== "undefined" && this.props.createPost.post !== null && this.props.createPost.post.length !== null && this.props.createPost.post.length > 0)  {
                        let postagem = this.props.createPost.post.filter(crea => crea.id === id)[0]
                        return <div>< CreatePostFilho 
                        postagem = {postagem} /></div>
                    }
                    return <div>{this.context.router.history.push('/error')}</div>

                }
            }

        }
    }
}

CreatePost.propTypes = {
    fetchGetPost: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        post: state.post,
        postId: state.postId,
        token: this.token,
        headers: headers,
        createPost: state.createPost
    }
}

const mapDispatchToProps = (dispatch) => {
    return (bindActionCreators({
        fetchPosts: (headers) => fetchPosts(headers),
        fetchGetPost: (postId, headers) => fetchGetPost(postId, headers),
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