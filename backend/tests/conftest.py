# import os
# import tempfile

import pytest

from app import create_app


@pytest.fixture
def client():
    # databaseHandle, app.config['DATABASE'] = tempfile.mkstemp()
    app = create_app(TestConfig)
    client = app.test_client()

    ctx = app.app_context()
    ctx.push()

    # with app.app_context():
    # init_db()

    yield client  # yield

    ctx.pop()

    # os.close(databaseHandle)
    # os.unlink(app.config['DATABASE'])


from config import Config


class TestConfig(Config):
    TESTING = True
