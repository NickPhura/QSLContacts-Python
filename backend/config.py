import os
basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'this-is-a-super-secret-key'

    API_URL = os.environ.get(
        'API_URL') or 'http://dir.gov.bc.ca/downloads/BCGOV_directory.xml'

    PORT = os.environ.get('APP_PORT') or 5000
    VERSION = os.environ.get('APP_VERSION') or '1.0.0'

    # SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
    #     'sqlite:///' + os.path.join(basedir, 'app.db')
    # SQLALCHEMY_TRACK_MODIFICATIONS = False
