import React, { Component } from 'react';

import './tau/wearable/theme/default/tau.css';
import './tau/wearable/theme/default/tau.circle.css';
import './tau/wearable/js/tau.min';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 'main',
    };
  }

  componentDidMount() {
    window.addEventListener('tizenhwkey', (ev) => {
      if (ev.keyName === 'back') {
        if (this.state.currentPage === 'main') {
          try {
            window.tizen.application.getCurrentApplication().exit();
          } catch (err) {
            // ignore
          }
        } else {
          this.changePage('main');
        }
      }
    });
  }

  changePage(page) {
    this.setState({
      currentPage: page,
    });
  }

  render() {
    if (this.state.currentPage === 'main') {
      return (
        <div className="ui-page ui-page-active">
          <header className="ui-header">
            <h2 className="ui-title">React Tizen</h2>
          </header>
          <div className="ui-content">
            <ul className="ui-listview">
              <li><a href="#option1" onClick={() => this.changePage('option1')}>Option 1</a></li>
              <li><a href="#option2" onClick={() => this.changePage('option2')}>Option 2</a></li>
              <li><a href="#option3" onClick={() => this.changePage('option3')}>Option 3</a></li>
            </ul>
          </div>
          <div className="ui-processing ui-processing-full-size" />
        </div>
      );
    }
    return (
      <div className="ui-page ui-page-active">
        <header className="ui-header">
          <h2 className="ui-title">React Tizen</h2>
        </header>
        <div className="ui-content">
          <ul className="ui-listview">
            Current page: {this.state.currentPage}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
