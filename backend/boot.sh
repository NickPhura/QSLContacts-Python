#!/bin/sh

# start virtual environment
source venv/bin/activate

# create database
# flask db upgrade

# for use with babel and i18n/l10n
# flask translate compile

# start gunicorn
exec gunicorn -b :5000 --reload --access-logfile - --error-logfile - backend-qsl-contacts:app