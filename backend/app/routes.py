import requests
import flask
import flask_restplus
import app
from . import person, xml_parser, vcard
# from flask import render_template, flash, redirect, url_for, jsonify
# from datetime import datetime
# import re

api = flask_restplus.Namespace('routes', description='Application operations.')


@api.route('health')
@api.doc('health')
class Health(flask_restplus.Resource):
    @api.doc(description='Basic health check to verify sever is running.')
    def get(self):
        return 'qsl-contacts-python server is running!'


@api.route('contacts')
@api.doc('contacts')
class Contacts(flask_restplus.Resource):
    @app.cache.cached()
    @api.doc(description='Get parsed list of contacts.')
    def get(self):
        app.app.logger.info('fetching non-cached data for /contacts')
        # fetch data from data bc endpoint
        response = requests.get(app.app.config['API_URL'])

        # raises an http error if and only if status indicates a failure
        response.raise_for_status()

        # parse response into array of Persons
        persons = xml_parser.XmlParser().getPersons(response.content)

        return flask.jsonify(persons)


@api.route('vcard')
@api.doc('health')
class VCard(flask_restplus.Resource):
    @app.cache.cached()
    @api.doc(description='Get vcard data for the given contact for download.')
    def get(self):
        card = vcard.VCard().get(api.payload)
        return flask.jsonify(card)

    @api.expect(person.getApiModel(api))
    def post(self):
        card = vcard.VCard().get(api.payload)
        return flask.jsonify(card)

# from flask import render_template, flash, redirect, url_for, jsonify
# from datetime import datetime
# import re


# @app.route('/')
# @app.route('/index')
# def index():
#   user = {'username': 'Miguel'}
#   posts = [
#       {
#           'author': {'username': 'John'},
#           'body': 'Beautiful day in Portland!'
#       },
#       {
#           'author': {'username': 'Susan'},
#           'body': 'The Avengers movie was so cool!'
#       }
#   ]
#   return render_template('index.html', title='Home', user=user, posts=posts)


# @app.route('/login', methods=['GET', 'POST'])
# def login():
#   form = LoginForm()
#   if form.validate_on_submit():
#     flash('Login requested for user {}, remember_me={}'.format(
#         form.username.data, form.remember_me.data))
#     return redirect(url_for('index'))
#   return render_template('login.html', title='Sign In', form=form)


# @api.route('/api/v1/hello')
# def hello_there(name):
#   now = datetime.now()
#   formatted_now = now.strftime('%A, %d %B, %Y at %X')

#   # Filter the name argument to letters only using regular expressions. URL arguments
#   # can contain arbitrary text, so we restrict to safe characters only.
#   match_object = re.match('[a-zA-Z]+', name)

#   clean_name = 'Friend'

#   if match_object:
#     clean_name = match_object.group(0)

#   content = 'Hello there, ' + clean_name + "! It's " + formatted_now
#   return content
