import flask
import flask_sqlalchemy

# Create the Flask application and the Flask-SQLAlchemy object.
from flask_uploads import UploadSet, IMAGES, configure_uploads, patch_request_class

UPLOAD_FOLDER = '/vagrant/VCT/img'
app = flask.Flask(__name__)
#app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['UPLOADED_IMAGES_DEST'] = UPLOAD_FOLDER
app.config['SECRET_KEY'] = 'I have a dream'
images = UploadSet('images', IMAGES)
configure_uploads(app, images)
patch_request_class(app)
app.config['DEBUG'] = True
<<<<<<< HEAD
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:HARPdarp854@localhost/test' #'sqlite:////tmp/test.db'
=======
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:Ubicomp7066@localhost/test' #'sqlite:////tmp/test.db'
>>>>>>> 9a5567eca0022f0f0bb157e3cb635b67ef8444c1
db = flask_sqlalchemy.SQLAlchemy(app)