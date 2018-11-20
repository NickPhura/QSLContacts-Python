import xml.etree.ElementTree as ET
from app import person
import re


class XmlParser:
    def getPersons(self, xmlString):
        """
        Parses an xml string into an array of Person's

        @param xmlString: valid xml string

        @return an array of Person's
        """
        persons = []

        tree = ET.fromstring(xmlString)
        if (tree):
            persons = self.recurseBuildPersons(tree, persons, '', '')

        return persons

    def recurseBuildPersons(self, parent, persons, organization, orgUnit):
        for item in parent:
            tag = self.getTag(item)
            if(tag == 'ORGANIZATION'):
                organization = self.getAttribute(item, 'NAME')
                self.recurseBuildPersons(item, persons, organization, orgUnit)
            elif(tag == 'ORGUNIT'):
                orgUnit = self.getAttribute(item, 'NAME')
                self.recurseBuildPersons(item, persons, organization, orgUnit)
            elif(tag == 'PERSON'):
                person = self.getPerson(item, organization, orgUnit)
                if(person):
                    persons.append(person)
        return persons

    def getPerson(self, item, organization, orgUnit):
        """
        Parses item, a PERSON xml element, into a Person.

        @param item: a single xml tag element

        @param organization: the organization string for this element

        @param orgUnit: the organization unit string for this element

        @return a Person built from the values parsed out of item
        """
        name = ''
        title = ''
        phone = ''
        email = ''

        children = list(item)
        for child in children:
            tag = self.getTag(child)
            if(tag == 'TITLE'):
                title = self.getValue(child)
            elif(tag == 'NAME'):
                name = self.getValue(child)
            elif(tag == 'CONTACT'):
                typeAttribute = self.getAttribute(child, 'TYPE')
                if(typeAttribute == 'telephone'):
                    phone = self.getValue(child)
                elif(typeAttribute == 'email'):
                    email = self.getValue(child)

        # If no contact information is available, dont create a Person
        if(not phone and not email):
            return None

        return person.Person(name, title, phone, email, organization, orgUnit)

    def getTag(self, item):
        """
        Gets the tag string from the element.

        Example:
        - when item is '<{someNamespace}TAG>' then return 'TAG'
        - when item is '<TAG>' then return 'TAG'

        @param item: a single xml tag element

        @return the tag portion of the item, with any namespace identifier removed
        """
        return re.match('(?:^{.*}){0,1}(.*$)', item.tag)[1] or ''

    def getAttribute(self, item, attribute):
        """
        Gets the attribute string from the element.

        Example:
        - when item is '<TAG NAME="someName">' and attribute is 'NAME' then return 'someName'
        - when item is '<TAG NAME="someName">' and attribute is 'TYPE' then return ''

        @param item: a single xml tag element

        @param attribute: an attribute string whose value should be returned if found

        @return the NAME attribute of the item or empty string if it doesnt exist
        """
        return item.get(attribute, '') or ''

    def getValue(self, item):
        """
        Gets the value of the item.

        Example:
        - when item '<TAG NAME="someName">someValue</TAG>' then return 'someValue'

        @param item: a single xml tag element

        @return the value of the element
        """
        return item.text or ''
