import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Container } from 'semantic-ui-react'

import Home from "../src/components/pages/Home";
import Login from "../src/components/pages/Login";
import Register from "../src/components/pages/Register"
import SinglePost from '../src/components/pages/SinglePost.js'
import MenuBar from "./components/common/MenuBar";

import { AuthProvider } from "./components/context/auth";

import { AuthRoute }from './components/context/authRedirect';



// TODO: add the page or route for 404 

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
          <Route exact path="/posts/:postId" component={SinglePost} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
