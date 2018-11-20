import React from 'react';
import PropTypes from 'prop-types';

/**
 * Renders a count of contacts in the form: 'Viewing 10 of 100 Results'
 * @param {Object} obj - An object
 * @param {number} obj.count - total count of filtered contacts
 * @param {number} obj.displayLimit - number of rows to display
 */
const CountMessage = ({ count, displayLimit }) => {
  CountMessage.propTypes = {
    count: PropTypes.number.isRequired,
    displayLimit: PropTypes.number.isRequired
  };

  const some = Math.min(displayLimit, count);

  return (
    <React.Fragment>
      Viewing {some} of {count} Results
    </React.Fragment>
  );
};
export default CountMessage;
