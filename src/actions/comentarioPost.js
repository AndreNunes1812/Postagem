export const INITIAL_FETCH_COMMENT = 'INITIAL_FETCH_COMMENT';

export const SET_COMENTARIOS = 'SET_COMENTARIOS';

export const ADD_COMENTARIO = 'ADD_COMENTARIO';
export const EDIT_COMENTARIO = 'EDIT_COMENTARIO'; 
export const REMOVE_COMENTARIO = 'REMOVE_COMENTARIO';

export const SET_VOTE_COMENTARIOS = 'SET_VOTE_COMENTARIOS';
export const COUNT_COMENTARIO = 'COUNT_COMENTARIO';
export const SET_PARENT_ID_COMENTARIOS = 'SET_PARENT_ID_COMENTARIOS';

// Função para inicializar o comentário
export function getInicialCommetFetch() {
    return {
        type: INITIAL_FETCH_COMMENT,
        payload: [
        {   id: '', 
            parentId: '',
            timestamp: Date.now(), 
            author: '', 
            body: '', 
            voteScore: 1, 
            deleted: false,
            parentDeleted: false,
            commentCount:0

        }]
    }
}

// function marcar Comentario para delete TRUE
export function fetchRemoveCommentId( postID , token ) {
 
     const headers = {
         'Content-Type': 'application/json',
         'Accept': 'application/json',
         'Authorization': token
     }
     return dispatch => {
             fetch( 'http://localhost:3001/comments/'+ postID, 
                 { method: 'DELETE', 
                   headers:  headers 
                 })
             .then(res => (
                res.json()
             ))
             .then(data => (
                dispatch(fetchGetParentCommentId( data.parentId , token ))
             )
            );
       }
 }



// Função para atualizar e adcionar o Comentario
export function addComentario(comment) {
    return {
        type: ADD_COMENTARIO,
        comment: comment,
    }
}

// Função para atualizar o Comentario
export function setComment(comment) {
    return {
        type: SET_COMENTARIOS,
        comment:  comment ,
    }
}

// Função para atualizar o(s) comentario(s) do ParentID
export function setParentCommentId(comment) {
   return {
       type: SET_PARENT_ID_COMENTARIOS,
       comment: comment.sort(voteCompare),
   }
}


// VoteScore Comentarios
export function fetchVoteCommentScore(postID, token, vote , pai) {
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token
    }
    return dispatch => {
        fetch('http://localhost:3001/comments/' + postID,
            {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({ 'option': vote })
            })
            .then(res => (
                res
            ))
            .then(data => (
                dispatch(fetchGetParentCommentId(pai , token ))
            )
            );
    }
}

// Função que faz a atualização do Comentario (Body e Data)
export function fetchUpdateComentarioPut(commentario , token , id ) {

    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token
    }

    return dispatch => {
            fetch( 'http://localhost:3001/comments/' + commentario.id , 
                { method: 'PUT', 
                  headers,                  
                  body: JSON.stringify( commentario )
                   })
            .then(res => (
               res.json()
            ))
            .then(data => (
                dispatch(fetchGetParentCommentId( commentario.parentId , token ))             
            )
           );
      }
}


// Função que faz a inclusão na API
export function fetchAddComentarioPost(commentario , token ) {

    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token
    }

    return dispatch => {
            fetch( 'http://localhost:3001/comments', 
                { method: 'POST', 
                  headers, 
                  body: JSON.stringify( commentario )  })
            .then(res => (
               res.json()
            ))
            .then(data => (
              dispatch(fetchGetParentCommentId( data.parentId , token ))              
            )
           );
      }
}

// Função que traz o(s) comentarios do parent
export function fetchGetParentCommentId(parentId , token  ) {

    return dispatch => {
            fetch( 'http://localhost:3001/posts/'+ parentId + '/comments', 
                { method: 'GET', 
                  headers:  {'Content-Type': 'application/json',
                              'Accept': 'application/json',
                              'Authorization': token
                            } 
                })
            .then(res => (
              res.json()
            ))
            .then(data => (
               dispatch(setParentCommentId(  data ))
            )
           );
      }
}


// Função para ordenação do VoteScore
function voteCompare(votea, voteb) {
    return votea.voteScore < voteb.voteScore;
}

