from json import JSONEncoder
from app import person


class ExtendedJsonEncoder(JSONEncoder):
    """Extended JSONEncoder to support jsonify of objects that are not JSON serializable by default

    Arguments:
        JSONEncoder {json.JSONEncoder} -- JSONEncoder base class to extend.

    Returns:
        json.JSONEncoder -- An extended JSONEncoder.
    """

    def default(self, obj):  # pylint: disable=E0202

        # add custom support for the Person class
        if isinstance(obj, person.Person):
            return JSONEncoder.encode(self, obj.toDictionary())

        # default case for objects that are serializable by default
        return JSONEncoder.default(self, obj)
