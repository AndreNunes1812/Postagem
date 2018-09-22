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
    console.log('Action...fetchRemoveCommentId',  postID );
    console.log('Action...fetchRemoveCommentId TOKEN :',token);
 
     const headers = {
         'Content-Type': 'application/json',
         'Accept': 'application/json',
         'Authorization': token
     }
     return dispatch => {
    //         console.log('Entrei no dispatch RemoveID:'),  
             fetch( 'http://localhost:3001/comments/'+ postID, 
                 { method: 'DELETE', 
                   headers:  headers 
                 })
             .then(res => (
    //             console.log('Retorno do res.json() RemoveID:', res),  
                res.json()
             ))
             .then(data => (
                console.log('Retorno do fetchRemoveCommentId:', data) , 
                dispatch(fetchGetParentCommentId( data.parentId , token ))
             )
            );
       }
 }



// Função para atualizar e adcionar o Comentario
export function addComentario(comment) {
    console.log('AddComentario ==>', comment)
    return {
        type: ADD_COMENTARIO,
        comment: comment,
    }
}

// Função para atualizar o Comentario
export function setComment(comment) {
   //  console.log('comment Action:', comment)     
    return {
        type: SET_COMENTARIOS,
        comment:  comment /*.sort(voteCompare)*/,
    }
}

// Função para atualizar o(s) comentario(s) do ParentID
export function setParentCommentId(comment) {
   console.log('setParentCommentId Action:', comment)     
   return {
       type: SET_PARENT_ID_COMENTARIOS,
       comment: comment.sort(voteCompare),
   }
}


// VoteScore Comentarios
export function fetchVoteCommentScore(postID, token, vote , pai) {

   //  console.log('Action...POST fetchVoteCommentScore:', JSON.stringify( pai ));
    // console.log('Action...TOKEN VoteScore:',token);

    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token
    }
    return dispatch => {
        //         console.log('Entrei no dispatch VoteScore:',vote),  
        fetch('http://localhost:3001/comments/' + postID,
            {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({ 'option': vote })
            })
            .then(res => (
                //             console.log('Retorno do res.json() VoteScore:', res),  
                res
            ))
            .then(data => (
                //            console.log('Retorno do VoteScore:', data),  
                dispatch(fetchGetParentCommentId(pai , token ))
            )
            );
    }
}

// Função que faz a atualização do Comentario (Body e Data)
export function fetchUpdateComentarioPut(commentario , token , id ) {

    console.log('Action.fetchUpdateComentarioPut:', JSON.stringify( commentario ));
 //  console.log('Action..fetchUpdateComentarioPut.TOKEN:',token);
 //   console.log('Action..fetchUpdateComentarioPut.ID:',commentario.id);
    
    let envio = { 'body': commentario.body , 'timestamp': commentario.timestamp }

   // console.log('envio:', JSON.stringify(envio));

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
                null
          //     console.log('fetchUpdateComentarioPut adcionado:', res )
               //,
               //res.json()
            ))
            .then(data => (
                console.log('fetchUpdateComentarioPut data:', data ),
                console.log('fetchUpdateComentarioPut comentario.id:', commentario.id ),
                
                //dispatch(addComentario( data ))  
              //  dispatch(fetchGetPostId( data.parentId , token ))
              dispatch(fetchGetParentCommentId( commentario.parentId , token ))
               
                
            )
           );
      }
}


// Função que faz a inclusão na API
export function fetchAddComentarioPost(commentario , token ) {

    console.log('Action.commentario..POST:', JSON.stringify( commentario ));
    console.log('Action..commentario.TOKEN:',token);

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
           //    console.log('AddComentario:', res ),
               res.json()
            ))
            .then(data => (
              console.log('Retornando AddComentario data:', data ) ,
              dispatch(fetchGetParentCommentId( data.parentId , token ))               
                
            )
           );
      }
}

// Função que traz o(s) comentarios do parent
export function fetchGetParentCommentId(parentId , token  ) {

   console.log('Action...GET fetchGetParentCommentId:',  parentId );
    console.log('Action...TOKEN fetchGetParentCommentId:',token);

    return dispatch => {
    //        console.log('Entrei no dispatch fetchGetParentCommentId:'),  
            fetch( 'http://localhost:3001/posts/'+ parentId + '/comments', 
                { method: 'GET', 
                  headers:  {'Content-Type': 'application/json',
                              'Accept': 'application/json',
                              'Authorization': token
                            } 
                })
            .then(res => (
                console.log('Retorno do res.json() fetchGetParentCommentId:', res),  
              res.json()
            ))
            .then(data => (
               console.log('Retorno do fetchGetParentCommentId:', data),  
               dispatch(setParentCommentId(  data ))
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
    return convertDate(voteDateA.timestamp) < convertDate(voteDateB.timestamp);
}

// Função para conversão de timestamp para formato DD/MM/YYYY
function convertDate( data ) {
    return new Intl.DateTimeFormat('pt-BR', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(data);
}