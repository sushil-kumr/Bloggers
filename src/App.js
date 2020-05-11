import './App.css';

import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'

import React, { Component } from 'react'
import AddPost from './pages/AddPost';
import Payment from './pages/Payment';
import Home from './pages/Home';
import ViewPost from './pages/ViewPost';
import NotFound from './pages/NotFound';

export default class App extends Component {

render() {

    return (
    <Router>
       <Switch>
            <Route path="/payment" exact component={Payment}/>
            <Route path="/post" exact  component={AddPost}/>
            <Route path="/:id"  component={ViewPost} />
            <Route path="/"  exact component={Home}  />
            <Route path="*" component={NotFound} /> 
        </Switch>
    </Router>
    );
}
}
