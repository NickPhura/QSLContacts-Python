import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/actions';
import MainSection from '../components/MainSection';

const mapStateToProps = state => ({
  contacts: state.contactsReducer.contacts
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainSection);
