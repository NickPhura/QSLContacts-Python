from app import person


def test_empty_person():
    emptyPerson = person.Person()
    assert emptyPerson._name == ''
    assert emptyPerson._title == ''
    assert emptyPerson._email == ''
    assert emptyPerson._phone == ''
    assert emptyPerson._organization == ''


class Test_Organization():
    def test_both_fields_populated(self):
        orgPerson = person.Person(organization='someOrganization', organizationUnit='someOrgUnit')
        assert orgPerson._name == ''
        assert orgPerson._title == ''
        assert orgPerson._email == ''
        assert orgPerson._phone == ''
        assert orgPerson._organization == 'someOrganization - someOrgUnit'

    def test_only_organization_populatd(self):
        orgPerson = person.Person(organization='someOrganization')
        assert orgPerson._name == ''
        assert orgPerson._title == ''
        assert orgPerson._email == ''
        assert orgPerson._phone == ''
        assert orgPerson._organization == 'someOrganization'

    def test_only_organizationUnit_populatd(self):
        orgPerson = person.Person(organizationUnit='someOrgUnit')
        assert orgPerson._name == ''
        assert orgPerson._title == ''
        assert orgPerson._email == ''
        assert orgPerson._phone == ''
        assert orgPerson._organization == 'someOrgUnit'


def test_empty_person_toDictionary():
    emptyPerson = person.Person()
    emptyDictionary = emptyPerson.toDictionary()
    expectedDictionary = {
        'name': '',
        'title': '',
        'phone': '',
        'email': '',
        'organization': ''
    }
    assert emptyDictionary == expectedDictionary
