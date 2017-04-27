import React, { Component } from 'react';
import { Page, Header, Content } from './Page';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 'main',
    };
  }

  componentDidMount() {
    document.addEventListener('dblclick', () => {
      this.back();
    });

    window.addEventListener('tizenhwkey', (ev) => {
      if (ev.keyName === 'back') {
        this.back();
      }
    });
  }

  back() {
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

  changePage(page) {
    this.setState({
      currentPage: page,
    });
  }

  render() {
    if (this.state.currentPage === 'main') {
      return (
        <Page>
          <Header>React Tizen</Header>
          <Content>
            <ul className="ui-listview">
              <li><a href="#option1" onClick={() => this.changePage('option1')}>Option 1</a></li>
              <li><a href="#option2" onClick={() => this.changePage('option2')}>Option 2</a></li>
              <li><a href="#option3" onClick={() => this.changePage('option3')}>Option 3</a></li>
            </ul>
          </Content>
          <div className="ui-processing ui-processing-full-size" />
        </Page>
      );
    }
    return (
      <Page>
        <Header>React Tizen</Header>
        <Content>
          Current page: {this.state.currentPage}
        </Content>
      </Page>
    );
  }
}

export default App;
