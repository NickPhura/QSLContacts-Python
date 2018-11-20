import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setFilterText, applyFilterText } from '../actions/actions';
import SearchBar from '../components/SearchBar';

const mapStateToProps = state => ({
  filterText: state.contactsReducer.filterText
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ setFilterText, applyFilterText }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
