import React from 'react';
import falcor, { Model as _Model } from 'falcor';
import HttpDataSource from 'falcor-http-datasource';

type ModelState = Readonly<{
  greeting: any;
}>;

class Model extends React.Component<{}, ModelState> {
  private source: HttpDataSource;
  private model: _Model;

  constructor(props) {
    super(props);
    this.state = {
      greeting: null
    };
  }

  public componentDidMount = () => {
    this.source = new HttpDataSource('/model.json');
    this.model = new falcor.Model({
      source: this.source
    });
    this.model.get('greeting').then((response) => {
      this.setState({
        greeting: response.json.greeting
      });
    });
  };

  public render() {
    return <div>Model: {this.state.greeting}</div>;
  }
}

export default Model;
