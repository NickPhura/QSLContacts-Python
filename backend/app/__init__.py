from flask import Flask
from config import Config
from flask_cors import CORS
from flask_caching import Cache
# from flask_restplus import Api

from app import extended_json_encoder, apis
# from flask_sqlalchemy import SQLAlchemy
# from flask_migrate import Migrate

cache = None


def create_app(config_class=Config):
    """Create a flask application.

    Keyword Arguments:
        config_class {Config} -- [The configuration to use.] (default: {Config})

    Returns:
        [flask.Flask] -- [A Flask application instance.]
    """

    app = Flask(__name__)

    app.config.from_object(config_class)

    global cache
    cache = Cache(app, config={'CACHE_TYPE': 'simple', 'CACHE_DEFAULT_TIMEOUT': 3600})

    # Add custom json encoder to support Person
    app.json_encoder = extended_json_encoder.ExtendedJsonEncoder

    CORS(app)

    api = apis.getApi(app)
    api.init_app(app)
    # register_routes(app, api)

    # db = SQLAlchemy(app)
    # migrate = Migrate(app, db)
    # from app import routes , models

    return app


# def register_routes(app, api):
#     from . import routes
#     api.add_resource(routes.Health, '/api/v1/health')
#     api.add_resource(routes.Contacts, '/api/v1/contacts')
#     api.add_resource(routes.VCard, '/api/v1/vcard')


app = create_app()
