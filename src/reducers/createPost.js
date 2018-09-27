import { INITIAL_FETCH, 
         ADD_POST, 
         EDIT_POST,
         SET_POSTS, 
         REMOVE_POST,
         SET_VOTE_POSTS,
         SET_ORDENAR_POST
         } from './../actions/createPost';

export default function createPost (state = [], action) {
    switch (action.type) {
        case INITIAL_FETCH:
            return { ...state, post: action.payload };
        case ADD_POST:
            return {...state, post: action.post };
        case EDIT_POST:
            return {...state, post: action.post };
        case SET_POSTS:
            return {...state, post: action.post };
        case REMOVE_POST:
            return {...state, post: action.payload.post }; 
        case SET_VOTE_POSTS:
            return {...state, post: action.post };     
        case SET_ORDENAR_POST:
             return {...state, post: action.post };                    
        default:
            return state;
    }
}