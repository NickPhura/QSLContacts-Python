import React from 'react';
import PropTypes from 'prop-types';
import CountMessage from '../components/CountMessage';
import LoadMore from '../components/LoadMore';
import { getVCard } from '../http/api'

const ObjectHash = require('node-object-hash')();

import './ContactsList.scss';

export default class ContactsList extends React.Component {
  static propTypes = {
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        email: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        organization: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
      })
    ).isRequired,
    filterText: PropTypes.string.isRequired,
    increment: PropTypes.number.isRequired,
    displayLimit: PropTypes.number.isRequired
  };

  componentDidMount = () => {
    this.props.actions.loadContacts();
  }

  /**
   * Returns an array of filtered contacts objects.
   * Each space separated word in the firstText is matched against each element of the contacts Object.
   * If at least 1 match is found, the contact will be included in the returned array.
   * @returns array of filtered contacts
   * @memberof ContactsList
   */
  getFilteredContacts = () => {
    if (this.props.filterText && this.props.filterText.trim().length > 3) {
      // normalize search terms
      const searchTerms = this.props.filterText.split(' ').filter(term => {
        //TODO sort by longest string
        return term !== ' ';
      });

      // for each contact: match each search term against each property
      return this.props.contacts.filter(item => {
        let isMatch = true;
        searchTerms.forEach(term => {
          isMatch =
            isMatch &&
            (item.name.toLowerCase().includes(term.toLowerCase()) ||
              item.title.toLowerCase().includes(term.toLowerCase()) ||
              item.organization.toLowerCase().includes(term.toLowerCase()) ||
              item.email.toLowerCase().includes(term.toLowerCase()) ||
              item.phone.toLowerCase().includes(term.toLowerCase()));
        });
        return isMatch;
      });
    } else {
      return this.props.contacts;
    }
  };

  renderLoadMoreButton = contactsCount => {
    if (contactsCount > this.props.displayLimit) {
      return (
        <LoadMore
          increaseDisplayLimit={this.props.actions.increaseDisplayLimit}
        />
      );
    }
    return '';
  };

  /**
   * Parses an array of contact objects into an array of html contact rows.
   * @returns an array of html contact rows
   * @memberof ContactsList
   */
  renderContactsList = () => {
    // apply filtering, if any
    const filteredContacts = this.getFilteredContacts();
    const numberOfRowsToDisplay = Math.min(
      this.props.displayLimit,
      filteredContacts.length
    );

    let htmlContacts = [];
    for (let i = 0; i < numberOfRowsToDisplay; i++) {
      const contact = filteredContacts[i];
      const key = ObjectHash.hash(contact); // a unique key is required by react to optimize element updates
      htmlContacts.push(
        <li className="contact-card list-group-item" key={key}>
          <div className="contact-card__details">
            <div className="contact-card__name">{contact.name}</div>
            <div className="contact-card__title-org-container">
              <span className="contact-card__title">{contact.title}</span>
              <span className="contact-card__org">{contact.organization}</span>
            </div>
          </div>
          <ul className="contact-card__actions">
            <li className="email action-item-container">
              <a
                className="btn btn-outline-primary"
                title="Email"
                href={`mailto:${contact.email}`}>
                <i className="material-icons">email</i>
                <span className="btn-label">{contact.email}</span>
              </a>
            </li>
            <li className="phone action-item-container">
              <a
                className="btn btn-outline-primary"
                title="Call"
                href={`tel:${contact.phone}`}>
                <i className="material-icons">phone</i>
                <span className="btn-label">{contact.phone}</span>
              </a>
            </li>
            <li className="export action-item-container">
              <button
                className="btn btn-outline-primary"
                title="Export VCard"
                onClick={() => { console.log('called!'); return getVCard(contact)}}>
                <i className="material-icons">perm_contact_calendar</i>
                <span className="btn-label">Export VCard</span>
              </button>
            </li>
          </ul>
        </li>
      );
    }
    return {
      contactsListToRender: htmlContacts,
      contactsCount: filteredContacts.length
    };
  };

  /**
   * Renders the ContactsLst component.
   * @returns components html
   * @memberof ContactsList
   */
  render() {
    // covnert the contacts object array into an array of html rows
    const { contactsListToRender, contactsCount } = this.renderContactsList();

    const loadMoreButtonToRender = this.renderLoadMoreButton(contactsCount);

    return (
      <div className="contact-list">
        <ul className="list-group">
          <li className="pagination__result-count list-group-item">
            <CountMessage
              count={contactsCount}
              displayLimit={this.props.displayLimit}
            />
          </li>
          {contactsListToRender}
          <li className="pagination__result-count list-group-item">
            <CountMessage
              count={contactsCount}
              displayLimit={this.props.displayLimit}
            />
          </li>
        </ul>
        {loadMoreButtonToRender}
      </div>
    );
  }
}
