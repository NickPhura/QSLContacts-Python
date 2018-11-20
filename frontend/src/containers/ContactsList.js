import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { increaseDisplayLimit, loadContacts, exportVCard } from '../actions/actions';
import ContactsList from '../components/ContactsList';

const mapStateToProps = state => ({
  contacts: state.contactsReducer.contacts,
  filterText: state.contactsReducer.filterText,
  increment: state.loadMoreReducer.increment,
  displayLimit: state.loadMoreReducer.displayLimit
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ increaseDisplayLimit, loadContacts, exportVCard }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactsList);
