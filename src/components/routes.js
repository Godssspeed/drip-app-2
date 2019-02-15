import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import CreatePost from "./posts/CreatePost";
import Profile from "./profile/Profile";

export default (
  <Switch>
    <Route exact path="/" component={Dashboard} />
    <Route path="/signin" component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/create" component={CreatePost} />
    <Route path="/:username" component={Profile} />
  </Switch>
);
