# from flask import Flask
#
# app = Flask(__name__)
#
#
# @app.route('/api')
# def hello_world():
#     return 'It works...'
#
#
# @app.route('/api/<name>')
# def return_name(name):
#     return 'Hello {name}'.format(name=name)
#
#
# if __name__ == '__main__':
#     app.run()

# Create the database tables.
import flask_restless

from config import db, app
from models import Person, Article


__API_PREFIX__ = "/api/v1.0"


db.create_all()

# Create the Flask-Restless API manager.
manager = flask_restless.APIManager(app, flask_sqlalchemy_db=db)

# Create API endpoints, which will be available at /api/<tablename> by
# default. Allowed HTTP methods can be specified as well.
manager.create_api(Person, methods=['GET', 'POST', 'DELETE'], url_prefix=__API_PREFIX__)
manager.create_api(Article, methods=['GET'], url_prefix=__API_PREFIX__)


@app.route('/api')
@app.route('/api/')
@app.route(__API_PREFIX__)
@app.route(__API_PREFIX__+'/')
def hello_world():
    return "It works..."



# start the flask loop
# app.run()
