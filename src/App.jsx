import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';
import { Page, Header, Content } from './Page';
import { List, Item } from './List';

const Splash = () =>
  <Page>
    <Content>
      <div className="small-processing-container">
        <div className="ui-processing" />
        <div className="ui-processing-text">
          Waiting for 3 seconds
        </div>
      </div>
    </Content>
  </Page>;

const Main = ({ match }) =>
  <Page>
    <Header>React Tizen</Header>
    <Content>
      <List match={match}>
        <Item id="option1">Option 1</Item>
        <Item id="option2">Option 2</Item>
        <Item id="option3">Option 3</Item>
        <Item id="option4">Option 4</Item>
      </List>
    </Content>;
  </Page>;

Main.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

const Action = ({ match }) =>
  <Page>
    <Content>
      Current action: {match.params.actionId}
    </Content>
  </Page>;

Action.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      actionId: PropTypes.string.isRequired,
    }),
  }),
};

class App extends Component {
  componentDidMount() {
    if (this.props.location.pathname === '/') {
      window.setTimeout(() => this.props.history.push('/main'), 3000);
    }

    window.addEventListener('tizenhwkey', (ev) => {
      if (ev.keyName === 'back') {
        if (this.props.location.pathname === '/main') {
          try {
            window.tizen.application.getCurrentApplication().exit();
          } catch (err) {
            // ignore
          }
        } else {
          this.props.history.goBack();
        }
      }
    });
  }

  render() {
    return (
      <div>
        <Route exact path="/" component={Splash} />
        <Route exact path="/main" component={Main} />
        <Route path="/main/:actionId" component={Action} />
      </div>
    );
  }
}

const AppWithRouter = withRouter(App);

export default AppWithRouter;
