import React from 'react';

type RecipeProps = Readonly<{
  title: string;
  tags: string[];
  description: string;
}>;

class Recipe extends React.Component<RecipeProps, {}> {
  public render() {
    const { title, tags, description } = this.props;

    const tagList = tags.map((tag) => <li key={tag}>{tag}</li>);

    return (
      <div className="recipe">
        <h2>{title}</h2>
        <ul>{tagList}</ul>
        <p>{description}</p>
      </div>
    );
  }
}

export default Recipe;
