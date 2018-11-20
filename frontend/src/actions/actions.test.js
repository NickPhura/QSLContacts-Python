import { updateContacts } from './actions';

describe('actions', () => {
  it('returns an updateContacts action with no contacts', () => {
    const actualAction = updateContacts();
    expect(actualAction).toStrictEqual({
      type: 'UPDATE_CONTACTS',
      contacts: undefined
    });
  });

  it('returns an updateContacts action with contacts', () => {
    const actualAction = updateContacts(['contactsList']);
    expect(actualAction).toStrictEqual({
      type: 'UPDATE_CONTACTS',
      contacts: ['contactsList']
    });
  });
});
