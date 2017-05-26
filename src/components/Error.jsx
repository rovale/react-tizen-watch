import React from 'react';
import { connect } from 'react-redux';

import { Page, Header, Content } from './common/Page';

let Error = ({ msg, url, lineNo, columnNo, error }) =>
  <Page>
    <Header>Error</Header>
    <Content>
      Msg: {msg}<br />
      Url: {url}<br />
      LineNo: {lineNo}<br />
      ColumnNo: {columnNo}<br />
      Error: {!!error && error.stack }
    </Content>
  </Page>;

const mapStateToProps = state => ({
  msg: state.ui.error.msg,
  url: state.ui.error.url,
  lineNo: state.ui.error.lineNo,
  columnNo: state.ui.error.columnNo,
  error: state.ui.error.error,
});

Error = connect(mapStateToProps)(Error);

export default Error;
