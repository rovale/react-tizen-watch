import { connect } from 'react-redux';
import { List } from './common/List';

const mapStateToProps = state => ({
  options: state.list.options,
  activeOptionId: state.list.activeOptionId,
});

const mapDispatchToProps = dispatch => ({
  onActivateOption: id => dispatch({ type: 'ACTIVATE_OPTION', id }),
});

export const Pages = connect(mapStateToProps, mapDispatchToProps)(List);

export default Pages;
