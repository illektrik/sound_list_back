import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import Main from "../Main/Main";
import AdminPanel from "../AdminPanel/AdminPanel";
import PlayListComponent from "../PlayList";
import withSession from "../withSession";

function App({refetch, user}) {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={ Main } />
        <Route path="/admin" render={() => <PlayListComponent user={user} />} />
        <Route path="/signin" render={() => <AdminPanel refetch={refetch} /> } />
        <Route render={() => <p>Not Found!</p>}/>
      </Switch>
    </Router>
  );
}
const AppWithSession = withSession(App);
export default AppWithSession;
