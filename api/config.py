import flask
import flask_sqlalchemy

# Create the Flask application and the Flask-SQLAlchemy object.
from flask_uploads import UploadSet, IMAGES, configure_uploads, patch_request_class

UPLOAD_FOLDER = 'acp1/cleaningCode/VCT/img'
app = flask.Flask(__name__)
#app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['UPLOADED_IMAGES_DEST'] = UPLOAD_FOLDER
app.config['SECRET_KEY'] = 'I have a dream'
images = UploadSet('images', IMAGES)
configure_uploads(app, images)
patch_request_class(app)
app.config['DEBUG'] = True

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:Ubicomp7066@localhost/test' #'sqlite:////tmp/test.db'

db = flask_sqlalchemy.SQLAlchemy(app)