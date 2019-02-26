import React from 'react';
import { hot } from 'react-hot-loader/root';

import Model from './Model';

const App: React.FunctionComponent<{}> = () => (
  <div>
    <h1>Falcor playground</h1>
    <p>Change this and watch it getting hot replaced</p>
    <Model />
  </div>
);

export default hot(App);
