import React from 'react';

import { model } from 'client/falcorModel';
import { PathKey } from 'server/constants';
import { project } from 'client/helpers';

type Recipe = Readonly<{
  id?: string;
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
    model.getValue(['recipe', 'length']).then((numberOfRecipies) => {
      if (!numberOfRecipies) {
        return;
      }

      const fields = ['title'];
      model.get([PathKey.Recipe, { from: 0, to: numberOfRecipies - 1 }, fields]).then(({ json }) => {
        this.setState({
          recipies: project<Recipe>(json[PathKey.Recipe], fields)
        });
      });
    });
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
