import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Page as UiPage, Content } from './common/Page';
import * as action from '../actions/creators';

let Action = ({ selectedPageId, onClosePage }) =>
  <UiPage>
    <Content>
      Current page: {selectedPageId}
    </Content>
    <footer className="ui-footer ui-bottom-button ui-fixed">
      <a href="#close" onClick={onClosePage} className="ui-btn">OK</a>
    </footer>
  </UiPage>;

Action.propTypes = {
  selectedPageId: PropTypes.string.isRequired,
  onClosePage: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  selectedPageId: state.ui.selectedPageId,
});

const mapDispatchToProps = dispatch => ({
  onClosePage: () => dispatch(action.closePage()),
});

Action = connect(mapStateToProps, mapDispatchToProps)(Action);

export default Action;
