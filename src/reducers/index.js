import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import todos from './todos';
import createPost from './createPost';
import comentarioPost from './comentarioPost';


export default combineReducers({
    todos,
    createPost,
    comentarioPost,
    form: formReducer,
})