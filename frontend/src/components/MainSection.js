import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from '../containers/SearchBar';
import ContactsList from '../containers/ContactsList';

import '../styles.scss'

const MainSection = ({ contacts, actions }) => {
  MainSection.propTypes = {
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        email: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        organization: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
      })
    ).isRequired,
    actions: PropTypes.object.isRequired
  };

  return (
    <main className='app-main'>
      <SearchBar />
      <ContactsList />
    </main>
  );
};

export default MainSection;
