import React from 'react';

import './SearchBar.scss';

const SearchBar = ({ filterText, actions }) => (
  <div className="searchbox">
    <div className="searchbox__input">
      <input
        className="form-control"
        value={filterText}
        onChange={event => {
          actions.setFilterText(event.target.value);
          actions.applyFilterText();
        }}
        id="contactSearchInput"
        placeholder="Search Directory"
        type="text"
      />
      <button
        role="button"
        className="clear-btn btn btn-light"
        id="contactSearchBtn"
        onClick={() => actions.setFilterText('')}>
        {' '}
        <i className="material-icons">close</i>
      </button>
    </div>
  </div>
);
export default SearchBar;
