import React from 'react';
import falcor, { Model as _Model } from 'falcor';
import HttpDataSource from 'falcor-http-datasource';

type ModelState = Readonly<{
  recipe: any;
}>;

class Model extends React.Component<{}, ModelState> {
  private source: HttpDataSource;
  private model: _Model;

  constructor(props) {
    super(props);
    this.state = {
      recipe: null
    };
  }

  public componentDidMount = () => {
    this.source = new HttpDataSource('/model.json', { timeout: 0 });
    this.model = new falcor.Model({
      source: this.source
    });
  };

  public render() {
    return <button onClick={this.clickHandler}>Fetch without cache</button>;
  }

  private clickHandler = async () => {
    this.model.invalidate(['recipe']);
    const numberOfRecipies: number = await this.model.getValue(['recipe', 'length']);

    this.model.get(['recipe', { from: 0, to: numberOfRecipies - 1 }, 'title']).then((response) => {
      console.log({
        response
      });
    });
  };
}

export default Model;
