import { connect } from 'react-redux';
import * as action from '../actions/creators';
import { List } from './common/List';

const mapStateToProps = state => ({
  options: state.pages,
  activeOptionId: state.ui.activePageId,
});

const mapDispatchToProps = dispatch => ({
  onActivateOption: id => dispatch(action.activatePage(id)),
});

export const Pages = connect(mapStateToProps, mapDispatchToProps)(List);

export default Pages;
