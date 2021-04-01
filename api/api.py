import json
import os
import time
from pathlib import Path
from shutil import copyfile

from bson import json_util
from flask import Flask, flash, redirect, request, send_file, session, url_for
from flask_pymongo import PyMongo
from werkzeug.utils import secure_filename

import model

app = Flask(__name__)

mongodb_client = PyMongo(app, uri="mongodb://localhost:27017/styleTransferDB")
db = mongodb_client.db

# path to inputs
INPUT_FOLDER = 'data/input'
app.config['INPUT_FOLDER'] = INPUT_FOLDER

# path to outputs
OUTPUT_FOLDER = 'data/output'
app.config['OUTPUT_FOLDER'] = OUTPUT_FOLDER

# disable caching
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

# temporary test image name
image_name = 'test.jpg'

# receive image and style it
@app.route('/', methods=['POST'])
def output_file():
    if request.method == 'POST':
        # check if has the file
        if 'file' not in request.files:
            flash('No file')
            return redirect(request.url)
        file = request.files['file']
        # no file -> url submitted without file name
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        # if file has an allowed extension
        if file:
            file.save(os.path.join(app.config['INPUT_FOLDER'], image_name))
            copyfile(INPUT_FOLDER + '/' + image_name, OUTPUT_FOLDER + '/' + image_name)
            # get styled image
            model.style_transfer(image_name, 'stained-glass')
            # redirect when done
            return redirect('http://localhost:3000/result')

# get input image
@app.route('/input/<string:image_name>', methods=['GET'])
def get_input_image(image_name):
    return send_file(INPUT_FOLDER + '/' + image_name)

# get output image
@app.route('/output/<string:image_name>', methods=['GET'])
def get_output_image(image_name):
    return send_file(OUTPUT_FOLDER + '/' + image_name)

# find model design instance by id
@app.route('/design/<string:design_id>')
def home(design_id):
    design = db.designs.find_one({"id": design_id})
    return json.loads(json_util.dumps(design))
