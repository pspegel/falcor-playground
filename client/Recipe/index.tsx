import React from 'react';
import { match as Match } from 'react-router-dom';

import { model } from 'client/falcorModel';
import { PathKey } from 'server/constants';

type RouteParams = Readonly<{
  id: string;
}>;

type RecipeProps = Readonly<{
  match: Match<RouteParams>;
}>;

type RecipeState = Readonly<{
  title: string;
  tags: string[];
  introduction: string;
}>;

class Recipe extends React.Component<RecipeProps, RecipeState> {
  constructor(props: RecipeProps) {
    super(props);
    this.state = {
      title: '',
      tags: [],
      introduction: ''
    };
  }

  public componentDidMount = () => {
    const { match } = this.props;

    const fields = ['title', 'tags', 'introduction'];
    model.get([PathKey.RecipeById, [match.params.id], fields]).then(({ json }) => {
      console.log({
        json
      });
    });
  };

  public render() {
    const { title, tags, introduction } = this.state;

    const tagList = tags.map((tag) => <li key={tag}>{tag}</li>);

    return (
      <div className="recipe">
        <h2>{title}</h2>
        <ul>{tagList}</ul>
        <p>{introduction}</p>
      </div>
    );
  }
}

export default Recipe;
