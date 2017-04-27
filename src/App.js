import './tau/wearable/theme/default/tau.css'
import './tau/wearable/theme/default/tau.circle.css'

import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div className="ui-page ui-page-active" id="main">
        <header className="ui-header">
          <h2 className="ui-title">React Tizen Watch</h2>
        </header>
        <div className="ui-content">
          To get started, edit <code>src/App.js</code> and save to reload.
        </div>
        <div className="ui-processing ui-processing-full-size"></div>
      </div>
    );
  }
}

export default App;
