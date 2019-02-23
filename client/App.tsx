import React from "react";
import { hot } from "react-hot-loader/root";

const App: React.FunctionComponent<{}> = () => (
  <div>
    <h1>Falcor playground</h1>
    <p>Change this and watch it getting hot replaced</p>
  </div>
);

export default hot(App);
