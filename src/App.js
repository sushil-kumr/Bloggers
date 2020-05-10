import './App.css';

import ReactPlayer from 'react-player'

import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'

import React, { Component } from 'react'
import AddPost from './pages/AddPost';
import Home from './pages/Home';
import ViewPost from './pages/ViewPost';
import NotFound from './pages/NotFound';

export default class App extends Component {

render() {

    return (
    <Router>
       <Switch>
            <Route path="/view"  component={ViewPost}/>
            <Route path="/post"  component={AddPost}/>
            <Route path="/" exact  component={Home}/>
            <Route path="*" component={NotFound}/> 
        </Switch>
    </Router>
    );
}
}
