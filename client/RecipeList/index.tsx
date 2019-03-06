import React from 'react';
import { Link } from 'react-router-dom';

import { model } from 'client/falcorModel';
import { PathKey } from 'server/constants';
import { project } from 'client/helpers';

type Recipe = Readonly<{
  id: string;
  title: string;
}>;

type RecipeListProps = Readonly<{}>;

type RecipeListState = Readonly<{
  recipes: Recipe[];
}>;

class RecipeList extends React.Component<RecipeListProps, RecipeListState> {
  constructor(props: RecipeListProps) {
    super(props);
    this.state = {
      recipes: []
    };
  }

  public componentDidMount = () => {
    model.getValue(['recipe', 'length']).then((numberOfRecipes) => {
      if (!numberOfRecipes) {
        return;
      }

      const fields = ['id', 'title'];
      model.get([PathKey.Recipe, { from: 0, to: numberOfRecipes - 1 }, fields]).then(({ json }) => {
        this.setState({
          recipes: project<Recipe>(json[PathKey.Recipe], fields)
        });
      });
    });
  };

  public render() {
    const { recipes } = this.state;

    const recipeList = recipes.map((recipe) => (
      <div key={recipe.id}>
        <Link to={`/recipe/${recipe.id}`} className="recipe-name">
          {recipe.title}
        </Link>
      </div>
    ));

    return (
      <div className="recipe-list">
        <h2>Recipes</h2>
        {recipeList}
      </div>
    );
  }
}

export default RecipeList;
