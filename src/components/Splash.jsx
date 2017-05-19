import React, { Component } from 'react';
import { Page, Content } from './common/Page';

class Splash extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <Page>
        <Content>
          <div className="small-processing-container">
            <div className="ui-processing" />
            <div className="ui-processing-text">
              Fetching data...
            </div>
          </div>
        </Content>
      </Page>
    );
  }
}

export default Splash;
