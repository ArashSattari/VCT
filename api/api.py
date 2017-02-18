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
import os

import flask_restless
from flask import flash
from flask import json
from flask import redirect
from flask import request
from flask import url_for
from sqlalchemy.util.langhelpers import methods_equivalent
from werkzeug.utils import secure_filename

from config import db, app, images
from models import User, Sign, Company

__API_PREFIX__ = "/api/v1.0"
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])


db.create_all()

# Create the Flask-Restless API manager.
manager = flask_restless.APIManager(app, flask_sqlalchemy_db=db)

# Create API endpoints, which will be available at /api/<tablename> by
# default. Allowed HTTP methods can be specified as well.
#manager.create_api(Person, methods=['GET', 'POST', 'DELETE'])
# manager.create_api(Article, methods=['GET'], url_prefix=__API_PREFIX__)

manager.create_api(User, methods=['GET', 'POST', 'DELETE'], url_prefix=__API_PREFIX__)
manager.create_api(Sign, methods=['GET', 'POST', 'DELETE'], url_prefix=__API_PREFIX__)
manager.create_api(Company, methods=['GET', 'POST', 'DELETE'], url_prefix=__API_PREFIX__)

@app.route('/api')
@app.route('/api/')
@app.route(__API_PREFIX__)
@app.route(__API_PREFIX__+'/')
def hello_world():
    return "It works..."

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/api/upload', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        # if user does not select file, browser also
        # submit a empty part without filename
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            #filename = secure_filename(file.filename)
            filename = images.save(file)
            #file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            return json.dumps({'filepath': '/img/'+filename})
    return '''
    <!doctype html>
    <title>Upload new File</title>
    <h1>Upload new File</h1>
    <form method=post enctype=multipart/form-data>
      <p><input type=file name=file>
         <input type=submit value=Upload>
    </form>
    '''

# start the flask loop
# app.run()
