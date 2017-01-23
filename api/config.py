import flask
import flask_sqlalchemy

# Create the Flask application and the Flask-SQLAlchemy object.
app = flask.Flask(__name__)
app.config['DEBUG'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:acp123456@localhost/test' #'sqlite:////tmp/test.db'
db = flask_sqlalchemy.SQLAlchemy(app)