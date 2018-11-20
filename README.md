# QSLContacts-python


## Backend

---

## Frontend

### public

> The root level index.html that is the parents for all other html pages/elements.

### src

#### actions
> Action creators.  Functions that return action objects.

#### components
> Concered with only rendering UI elements.  If data is needed, it should be passed to it by a container (see _containers_ below). Not all components will need data.

#### constants
> System constants. For example, the action types should be defined here.

#### containers
> Counterparts to components.  Containers get data from the state, parse it, and pass it to the component.  Any logic or data manipulation should happen here, so that the component can be as dumb as possible.

#### selectors
> Functions that provide access to parts of the state that are used often and by many components, thus warranting its own selector.

#### store
> The configuration/instantiation of the state store object.  All data that the app uses should be saved in the state.

---

## Technology Stack

### Front End

* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/)
* [React-Redux](https://github.com/reduxjs/react-redux) - (React bindings for Redux)

### Back End

* [Python](https://www.python.org/)
  * pip - https://pypi.org/ - (essentially npm for python)

* [Flask](http://flask.pocoo.org/) with [Flask-RESTPlus](http://flask-restplus.readthedocs.io/en/stable/)

* [SQLAlchemy](https://www.sqlalchemy.org/)

### Database

* [PostgreSQL](https://www.postgresql.org/) with [PostGIS extension](https://postgis.net/)

### DevOps Environment

* [Red Hat OpenShift Container Application Platform](https://docs.openshift.com/container-platform/3.9/welcome/index.html)

---

## Additional Resources

Python
* [Python Testing - pytest](https://docs.pytest.org/en/latest/)

[Flask](http://flask.pocoo.org/)
* [Flask's Tutorial](http://flask.pocoo.org/docs/1.0/tutorial/)
* [The Flask Mega Tutorial](https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world) - Well defined step-by-step guide to building a Flask application.

[React](https://reactjs.org/tutorial/tutorial.html)
* [React Testing Libraries](https://reactjs.org/community/testing.html)
* [React’s Five Fingers of Death. Master these five concepts, then master React](https://medium.freecodecamp.org/the-5-things-you-need-to-know-to-understand-react-a1dbd5d114a3) - Good explanation of basic react concepts.

[Redux](https://redux.js.org)
* [Overview, Learning Resources, Examples](https://redux.js.org/introduction)
* [Example React-redux projects](https://github.com/reduxjs/redux/tree/master/examples)

[Docker](https://www.docker.com/)
* [Build a Docker Image Out of a Flask Project](https://medium.com/@angellom/build-a-docker-image-out-of-a-flask-project-6b22122ff0f0)

Other
* [gunicorn](http://gunicorn.org/) - turn python project into application server
  * [caddy](https://caddyserver.com/) - turn application server into web server
    * [caddyfile docs](https://caddyserver.com/docs/caddyfile)
  * [nginx](https://www.nginx.com/) - turn application server into web server