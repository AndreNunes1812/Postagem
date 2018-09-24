import { 
    INITIAL_FETCH_COMMENT, 
    ADD_COMMENT, 
    SET_COMMENT, 
    REMOVE_COMMENT,
    SET_VOTE_COMMENT,
    COUNT_COMMENT,
    SET_PARENT_ID_COMMENT } from './../actions/comentarioPost';

export default function comentarioPost (state = [], action) {

switch (action.type) {
   case INITIAL_FETCH_COMMENT:
       return { ...state, comment: action.payload };
   case ADD_COMMENT:
       return {...state, comment: action.comment };
   case SET_COMMENT:
       return {...state, comment: action.comment };
   case REMOVE_COMMENT:
       return {...state, comment: action.payload.comment }; 
   case SET_VOTE_COMMENT:
       return {...state, comment: action.comment };   
    case COUNT_COMMENT:
       return {...state, commentCount: action.commentCount };   
    case SET_PARENT_ID_COMMENT:
       return {...state, comment: action.comment };                              
   default:
       return state;
    }
}