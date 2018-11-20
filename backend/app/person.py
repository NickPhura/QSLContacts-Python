from flask_restplus import fields


class Person():
    def __init__(self, name='', title='', phone='', email='', organization='', organizationUnit=''):
        """Person constructor.

        Keyword Arguments:
            name {str} -- Person name (default: {''})
            title {str} -- Person title (default: {''})
            phone {str} -- Person phone (default: {''})
            email {str} -- Person email (default: {''})
            organization {str} -- Person organization (default: {''})
            organizationUnit {str} -- Person organization unit (default: {''})
        """

        self._name = name
        self._title = title
        self._phone = phone
        self._email = email
        self._organization = self.getCombinedOrganization(
            organization, organizationUnit)

    def getCombinedOrganization(self, org, orgUnit):
        """
        Returned a single string containing org and/or orgUnit

        Example:
        - when org is 'anOrg' and orgUnit is 'aUnit' then return 'anOrg - aUnit'
        - when org is 'anOrg' and orgUnit is None or empty then return 'anOrg'
        - with org is None or empty and orgUnit is 'aUnit' then return 'aUnit'
        - with org is None or empty and orgUnit is None or empty then return ''

        @param org: an organization string

        @param orgUnit: an organizationUnit string

        @return: a formatted string containing org and/or orgUnit
        """
        if(org and orgUnit and (org != orgUnit)):
            return '{} - {}'.format(org, orgUnit)
        return org or orgUnit or ''

    def toDictionary(self):
        """Returns this classes properties as a Dictionary."""
        return {
            "name": self._name,
            "title": self._title,
            "phone": self._phone,
            "email": self._email,
            "organization": self._organization,
        }


def getApiModel(api):
    return api.model('Person', {
        'name': fields.String,
        'title': fields.String,
        'phone': fields.String,
        'email': fields.String,
        'organization': fields.String
    })
