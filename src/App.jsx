import React, { Component } from 'react';
import { Page, Header, Content } from './Page';
import { List, Item } from './List';

class App extends Component {
  constructor(props) {
    super(props);

    this.changePage = this.changePage.bind(this);

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
            <List onSelect={this.changePage}>
              <Item id="option1">Option 1</Item>
              <Item id="option2">Option 2</Item>
              <Item id="option3">Option 3</Item>
              <Item id="option4">Option 4</Item>
            </List>
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
