import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as action from '../actions/creators';
import { Page as UiPage, Header, Content } from './common/Page';
import { List } from './common/List';

import settings from '../settings';

let Pages = ({
  pages, activePageId, onActivatePage, onSelectPage,
}) => (
  <UiPage>
    <Header>{settings.title}</Header>
    <Content>
      <List
        options={pages}
        activeOptionId={activePageId}
        onActivateOption={onActivatePage}
        onSelectOption={onSelectPage}
      />
    </Content>
  </UiPage>
);

Pages.propTypes = {
  pages: PropTypes.arrayOf(PropTypes.object).isRequired,
  activePageId: PropTypes.string.isRequired,
  onActivatePage: PropTypes.func.isRequired,
  onSelectPage: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  pages: state.pages,
  activePageId: state.ui.activePageId || state.pages[0].id,
});

const mapDispatchToProps = dispatch => ({
  onActivatePage: id => dispatch(action.activatePage(id)),
  onSelectPage: id => dispatch(action.selectPage(id)),
});

Pages = connect(mapStateToProps, mapDispatchToProps)(Pages);

export default Pages;
