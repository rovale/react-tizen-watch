import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Page, Header, Content } from './common/Page';

const Error = ({
  msg, url, lineNo, columnNo, error,
}) => (
  <Page>
    <Header>Error</Header>
    <Content>
      Msg: {msg}<br />
      Url: {url}<br />
      LineNo: {lineNo}<br />
      ColumnNo: {columnNo}<br />
      Error: {!!error && error.stack }
    </Content>
  </Page>
);

Error.propTypes = {
  msg: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  lineNo: PropTypes.number.isRequired,
  columnNo: PropTypes.number.isRequired,
  error: PropTypes.shape({
    stack: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  msg: state.ui.error.msg,
  url: state.ui.error.url,
  lineNo: state.ui.error.lineNo,
  columnNo: state.ui.error.columnNo,
  error: state.ui.error.error,
});

export default connect(mapStateToProps)(Error);
