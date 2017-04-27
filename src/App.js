import './tau/wearable/theme/default/tau.css'
import './tau/wearable/theme/default/tau.circle.css'
import './tau/wearable/js/tau.min.js'

import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: "main"
    };
  }

  componentDidMount() {
    window.addEventListener('tizenhwkey', ev => {
      if (ev.keyName === "back") {
        if (this.state.currentPage === "main") {
          try {
            window.tizen.application.getCurrentApplication().exit();
          } catch (ignore) { }
        } else {
          this.changePage("main");          
        }
      }
    });
  }

  changePage(page) {
    this.setState({
      currentPage: page
    });
  }

  render() {
    if (this.state.currentPage === "main") {
      return (
        <div className="ui-page ui-page-active">
          <header className="ui-header">
            <h2 className="ui-title">React Tizen</h2>
          </header>
          <div className="ui-content">
            <ul className="ui-listview">
              <li><a href="#" onClick={() => this.changePage("option1")}>Option 1</a></li>
              <li><a href="#" onClick={() => this.changePage("option2")}>Option 2</a></li>
              <li><a href="#" onClick={() => this.changePage("option3")}>Option 3</a></li>
            </ul>
          </div>
          <div className="ui-processing ui-processing-full-size"></div>
        </div>
      );
    } else {
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
}

export default App;
