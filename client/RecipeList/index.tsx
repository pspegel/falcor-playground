import React from 'react';

import { model } from 'client/falcorModel';
import { PathKey } from 'server/constants';

type Recipe = Readonly<{
  id: string;
  title: string;
}>;

type RecipeListProps = Readonly<{}>;

type RecipeListState = Readonly<{
  recipies: Recipe[];
}>;

class RecipeList extends React.Component<RecipeListProps, RecipeListState> {
  constructor(props) {
    super(props);
    this.state = {
      recipies: []
    };
  }

  public componentDidMount = () => {
    // model.getValue(['recipe', 'length']).then((numberOfRecipies) => {
    //   model
    //     .get([PathKey.Recipe, { from: 0, to: numberOfRecipies - 1 }, ['title', 'description', 'tags']])
    //     .then((response) => {
    //       // this.setState({
    //       //   recipies: response.json
    //       // });
    //     });
    // });
  };

  public render() {
    const { recipies } = this.state;

    const recipeList = recipies.map((recipe) => (
      <div key={recipe.id}>
        <span className="recipe-name">{recipe.title}</span>
      </div>
    ));

    return (
      <div className="recipe-list">
        <h2>Recipies</h2>
        {recipeList}
      </div>
    );
  }
}

export default RecipeList;
