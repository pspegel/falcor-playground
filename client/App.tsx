import React from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import RecipeList from './RecipeList';
import Recipe from './Recipe';

class App extends React.Component<{}, {}> {
  public render() {
    return (
      <Router>
        <>
          <h1>Falcor playground</h1>
          <p>Change this and watch it getting hot replaced</p>
          <Route exact={true} path="/" component={RecipeList} />
          <Route path="/recipe/:id" component={Recipe} />
        </>
      </Router>
    );
  }
}

export default hot(App);
