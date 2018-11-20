import React from 'react';
import PropTypes from 'prop-types';

import './LoadMore.scss';

const LoadMore = ({ increaseDisplayLimit }) => {
  LoadMore.propTypes = {
    increaseDisplayLimit: PropTypes.func.isRequired
  };

  return (
    <div className='load-more-container mt-3'>
      <button className='btn btn-sm btn-primary' onClick={increaseDisplayLimit}>Load More Contacts</button>
    </div>
  )
};
export default LoadMore;
