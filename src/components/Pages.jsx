import { connect } from 'react-redux';
import { List } from './common/List';

const mapStateToProps = (state) =>  {
  return {
    options: state.pages,
    activeOptionId: state.ui.activePageId,
  };
};

const mapDispatchToProps = dispatch => ({
  onActivateOption: id => dispatch({ type: 'ACTIVATE_PAGE', id }),
});

export const Pages = connect(mapStateToProps, mapDispatchToProps)(List);

export default Pages;
