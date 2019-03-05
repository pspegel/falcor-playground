import React from 'react';
import { hot } from 'react-hot-loader/root';

import RecipeList from './RecipeList';

class App extends React.Component<{}, {}> {
  public render() {
    return (
      <div>
        <h1>Falcor playground</h1>
        <p>Change this and watch it getting hot replaced</p>
        <RecipeList />
      </div>
    );
  }
}

export default hot(App);
