import vobject
from datetime import datetime
from dateutil.tz import tzlocal


class VCard():
    def get(self, object):
        print('============================')
        print(object)
        print('============================')
        card = vobject.vCard()

        card.add('n')
        nameLast, nameFirst = [x.strip() for x in object['name'].split(',')]
        card.n.value = vobject.vcard.Name(family=nameLast, given=nameFirst)

        card.add('fn')
        card.fn.value = object['name']

        card.add('email')
        card.email.type_param = ['HOME', 'INTERNET']
        card.email.value = object['email']

        card.add('org')
        card.org.value = [object['organization']]

        card.add('title')
        card.title.value = object['title']

        card.add('tel')
        card.tel.type_param = 'Work'
        card.tel.value = object['phone']

        card.add('rev')
        card.rev.value = datetime.now(
            tzlocal()).strftime('%Y-%m-%dT%H:%M:%S%z')

        print(card.serialize())
        return card.serialize()
