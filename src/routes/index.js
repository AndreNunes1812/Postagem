import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import history from '../history';

import NewPost from '../pages/newpost/NewPost';
import CreatePost from '../pages/createpost/CreatePost';
import ComentarioPost from '../pages/comentarios/ComentarioPost';


const Routes = () => (
    <Router history={history}>
        <Switch>
            <Route exact path="/" component={NewPost} />
            <Route path="/post" component={CreatePost} />
            <Route path="/comentario" component={ComentarioPost} />
            <Route path="/comentario/:id" component={ComentarioPost} />
            

        </Switch>
    </Router>
);

export default Routes;
