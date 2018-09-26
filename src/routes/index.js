import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import PostagemList from '../pages/newpost/PostagemList'
import CreatePost from '../pages/createpost/CreatePost'
import ComentarioPost from '../pages/comentarios/ComentarioPost'
import CategoriaList from '../pages/newpost/CategoriaList'
import Error404 from '../pages/error/Error404'

const Routes = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={PostagemList} />
            <Route path="/post" component={CreatePost} />
            <Route path="/post/:id" component={CreatePost} />
            
            <Route path="/category" component={ComentarioPost} />
            <Route path="/category/:id" component={ComentarioPost} />

            <Route path="/categoria" component={CategoriaList} />
            <Route path="/categoria/:id" component={CategoriaList} />

            <Route exact={true} path='*' component={Error404} />           

        </Switch>
    </Router>
);

export default Routes