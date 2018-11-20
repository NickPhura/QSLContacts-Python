import axios from 'axios';

const requestHeaders = { headers: { 'Access-Control-Allow-Origin': '*' } };

/**
 * Get a list of contacts.
 * @returns a promise that resolves with the response of the HTTP request, which could contain a an HTTP failure code.
 * @throws an Error if an exception occurs.  Does not throw an Error for HTTP failure codes.
 */
const getContacts = () => {
  return axios
    .get('http://localhost:5000/api/v1/contacts', requestHeaders)
    .then(
      response => {
        return response.data;
      },
      error => {
        throw new Error(error);
      }
    );
};
module.exports.getContacts = getContacts;

const getVCard = vcardData => {
  return axios
    .post('http://localhost:5000/api/v1/vcard', vcardData, requestHeaders)
    .then(
      response => {
        return response.data;
      },
      error => {
        throw new Error(error);
      }
    );
};
module.exports.getVCard = getVCard;
