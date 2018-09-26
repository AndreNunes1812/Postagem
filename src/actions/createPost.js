export const INITIAL_FETCH = 'INITIAL_FETCH';

export const SET_POSTS = 'SET_POSTS';
export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const REMOVE_POST = 'REMOVE_POST';

export const CATEGORY_POST = 'CATEGORY_POST';
export const SET_VOTE_POSTS = 'SET_VOTE_POSTS';
export const SET_ORDENAR_POST = "SET_ORDENAR_POST"


// Função para inicializar o Post
export function getInicialFetch() {
    return {
        type: INITIAL_FETCH,
        payload: { id: '', timestamp: Date.now(), title: '', author: '', body: '', category: '', voteScore: 1, deleted: false }
    }
}

// Função para atualizar adcionar o Post
export function addPost(post) {
    return {
        type: ADD_POST,
        post: post,
    }
}

// Função para atualizar o Post
export function setPosts(posts) {
    return {
        type: SET_POSTS,
        post: posts.sort(voteCompare),
    }
}

// Função para atualizar o VoteScore
export function setVoteScorePost(post) {
    return {
        type: SET_VOTE_POSTS,
        post: post,
    }
}

// Função para remover o Post
export function setRemovePost(post) {
    return {
        type: REMOVE_POST,
        payload: post,
    }
}

// Função para retornar a Data Ordenada
export function setOrdenacaoData(post) {
    return {
        type: SET_ORDENAR_POST,
        post: post,
    }
}

// Função para ordenar por data
export function fetchOrdenarDataPost(posts) {
    return dispatch => {
        let postagemData = posts.sort(voteCreateDate);
        dispatch(setOrdenacaoData(postagemData))
    }
}

// Função para ordenar Score
export function fetchOrdenarScorePost(posts) {
    return dispatch => {
        let postagemData = posts.sort(voteCompare);
        dispatch(setOrdenacaoData(postagemData))
    }
}


// Função que faz a inclusão na API
export function fetchAddPost(post, token) {
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token
    }
    return dispatch => {
        fetch('http://localhost:3001/posts',
            {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(post)
            })
            .then(res => (
                res.json()
            ))
            .then(data => (
                null
            )
            );
    }
}

// Função que traz os post de uma determinada categoria
export function fetchCategoryPost(category, token) {

    return dispatch => {
        fetch('http://localhost:3001/' + category + '/posts',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': token
                }
            })
            .then(res => (
                res.json()
            ))
            .then(data => (
                dispatch(setPosts(data))
            )
            );
    }
}

// Função que atualiza o post pelo ID
export function fetchPutPostId(categoryID, token) {
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token
    }
    return dispatch => {
        fetch('http://localhost:3001/post/' + categoryID,
            {
                method: 'PUT',
                headers: headers
            })
            .then(res => (
                res.json()
            ))
            .then(data => (
                dispatch(setPosts(data))
            )
            );
    }
}

// Função que remove o post pelo ID
export const removePost = (id) => {
    return {
        type: REMOVE_POST,
        payload: id
    }
}

// Função que edita o post ID
export const editPost = (id) => {
    return {
        type: EDIT_POST,
        payload: id
    }
}

// Função que traz todos os post
export function fetchPosts(headers) {
    return dispatch => {
        fetch('http://localhost:3001/posts', { headers })
            .then(res => (
                res.json()
            ))
            .then(data => (
                dispatch(setPosts(data))));
    }
}

// function remove Post
export function fetchRemovePostId(postID, token) {

    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token
    }
    return dispatch => {
        fetch('http://localhost:3001/posts/' + postID,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': token
                }
            })
            .then(res => (
                res.json()
            ))
            .then(data => (
                dispatch(fetchPosts(headers))
            )
            );
    }
}

// VoteScore Postagem
export function fetchVoteScore(postID, token, vote) {
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token
    }
    return dispatch => {

        fetch('http://localhost:3001/posts/' + postID,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({ 'option': vote })
            })
            .then(res => (
                res
            ))
            .then(data => (
                dispatch(fetchPosts(headers))
            )
            );
    }
}

// Função para ordenação do VoteScore
function voteCompare(votea, voteb) {
    return votea.voteScore < voteb.voteScore;
}

// Função para ordenação da data de criação
function voteCreateDate(voteDateA, voteDateB) {
    return voteDateA.timestamp < voteDateB.timestamp;
}
