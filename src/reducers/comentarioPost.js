import { 
    INITIAL_FETCH_COMMENT, 
    ADD_COMENTARIO, 
    SET_COMENTARIOS, 
    REMOVE_COMENTARIO,
    SET_VOTE_COMENTARIOS,
    COUNT_COMENTARIO,
    SET_PARENT_ID_COMENTARIOS } from './../actions/comentarioPost';

export default function comentarioPost (state = [], action) {

switch (action.type) {
   case INITIAL_FETCH_COMMENT:
       return { ...state, comment: action.payload };
   case ADD_COMENTARIO:
       return {...state, comment: action.comment };
   case SET_COMENTARIOS:
       return {...state, comment: action.comment };
   case REMOVE_COMENTARIO:
       return {...state, comment: action.payload.comment }; 
   case SET_VOTE_COMENTARIOS:
       return {...state, comment: action.comment };   
    case COUNT_COMENTARIO:
       return {...state, commentCount: action.commentCount };   
    case SET_PARENT_ID_COMENTARIOS:
       return {...state, comment: action.comment };                              
   default:
       return state;
    }
}