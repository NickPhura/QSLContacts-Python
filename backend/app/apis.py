from flask_restplus import Api


def getApi(app):
    """Creates a flask restplus api instance.  All routes for this module should be added here.

    Arguments:
        app {flask.Flask} -- [A Flask application instance.]

    Returns:
        [flask_restplus.Api] -- [A flask_restplus Api instance.]
    """

    from . import routes
    api = Api(
        title='QSL Contacts - Python',
        version=app.config['VERSION'],
        description='QSLContacts app written in python'
    )

    api.add_namespace(routes.api, path='/api/v1/')

    return api
