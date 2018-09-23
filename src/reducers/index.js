import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import categorias from './categorias';
import createPost from './createPost';
import comentarioPost from './comentarioPost';


export default combineReducers({
    categorias,
    createPost,
    comentarioPost,
    form: formReducer,
})