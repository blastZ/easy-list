import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import ListsPage from './components/ListsPage';
import ListPage from './components/ListPage';
class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={ListsPage} />
          <Route exact path="/:listname" component={ListPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
