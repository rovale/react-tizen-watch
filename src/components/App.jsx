import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Link } from 'react-router-dom';
import { Page, Header, Content } from './common/Page';
import { Pages } from './Pages';

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

const Main = () =>
  <Page>
    <Header>React Tizen</Header>
    <Content>
      <Pages />
    </Content>
  </Page>;

const Action = ({ match }) =>
  <Page>
    <Content>
      Current action: {match.params.actionId}
    </Content>
    <footer className="ui-footer ui-bottom-button ui-fixed">
      <Link to="/main" className="ui-btn">OK</Link>
    </footer>
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
    window.addEventListener('tizenhwkey', (ev) => {
      if (ev.key || ev.keyName === 'back') {
        if (this.context.router.route.location.pathname === '/main') {
          try {
            console.log('Exiting.');
            window.tizen.application.getCurrentApplication().exit();
          } catch (err) {
            // ignore
          }
        } else {
          this.context.router.history.goBack();
        }
      }
    });

    window.addEventListener('keyup', (e) => {
      switch (e.key) {
        case 'ArrowRight':
          window.dispatchEvent(new CustomEvent('rotarydetent', { detail: { direction: 'CW' } }));
          break;
        case 'ArrowLeft':
          window.dispatchEvent(new CustomEvent('rotarydetent', { detail: { direction: 'CCW' } }));
          break;
        case 'Backspace':
          window.dispatchEvent(new KeyboardEvent('tizenhwkey', { key: 'back' }));
          break;
        default:
          break;
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

App.contextTypes = {
  router: PropTypes.shape({
    history: PropTypes.object.isRequired,
  }),
};

export default App;
