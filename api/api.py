

import json
import os
import time
from random import choices
from pathlib import Path
from shutil import copyfile
from string import ascii_lowercase, digits

from bson import json_util
from flask import Flask, flash, redirect, request, send_file, session, url_for, jsonify, Response
from flask_cors import cross_origin, CORS
from flask_pymongo import PyMongo
from werkzeug.utils import secure_filename
from copy import deepcopy

import model

app = Flask(__name__)
CORS(app)

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

# default design database entry
design_data_default = {
    'id' : '',
    'style_image_name' : '',
    'content_layer' : 'block4_conv2',
    'style_layers' : {
        'block1_conv1': 0.2,
        'block2_conv1': 0.3,
        'block3_conv1': 0.3,
        'block4_conv1': 0.10,
        'block5_conv1': 0.15
    },
    'content_weight' : 2,
    'style_weight' : 3,
    'iterations' : 50
}

# default pin database entry
pin_data_default = {
    'id': '',
    'pin': 1234
}

# design id length
design_id_length = 6

# get random string of numbers and lower case letters
def get_random_design_id():
    return ''.join(choices(digits + ascii_lowercase, k=design_id_length))

# check if design id excists
def check_design_id(design_id):
    design = db.designs.find_one({"id": design_id})
    return (design is not None)

# get new random id that doesn not yet exist in the database
def get_new_design_id():
    random_string = get_random_design_id()
    unique = False
    while not (unique):
        result = check_design_id(random_string)
        if (result == False):
            unique = True
        else:
            random_string = get_random_design_id()
    return random_string

# save uploaded image
@app.route('/', methods=['POST'])
def save_image():
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
            return Response(status=200)

# get styled image
@app.route('/style_transfer/<string:design_id>')
@cross_origin()
def style_transfer(design_id):
    model.style_transfer(image_name, 'stained-glass')
    return Response(status=200)

# get input image
@app.route('/input/<string:image_name>', methods=['GET'])
@cross_origin()
def get_input_image(image_name):
    return send_file(INPUT_FOLDER + '/' + image_name)

# get output image
@app.route('/output/<string:image_name>', methods=['GET'])
@cross_origin()
def get_output_image(image_name):
    return send_file(OUTPUT_FOLDER + '/' + image_name)

# check if design and pin combo exists
@app.route('/check_design_with_pin', methods=['POST'])
@cross_origin()
def check_design_with_pin():
    design_id = request.json['design_id']
    pin = request.json['pin']
    pin_data = db.pins.find_one({'id': design_id, 'pin': int(pin)})
    return Response(status=200) if json.loads(json_util.dumps(pin_data)) else Response(status=404)

# get design by id
@app.route('/get_design/<string:design_id>')
@cross_origin()
def get_design_by_id(design_id):
    design_data = db.designs.find_one({"id": design_id})
    design_json = json_util.dumps(design_data)
    return Response(status=200, response=design_json) if json.loads(json_util.dumps(design_json)) else Response(status=404)

# update existing design
@app.route('/update_design', methods=['POST'])
@cross_origin()
def update_design():
    design_id = request.json['design_id']
    style_image_name = request.json['style_image_name']
    content_layer = request.json['content_layer']
    style_layers = request.json['style_layers']
    content_weight = request.json['content_weight']
    style_weight = request.json['style_weight']
    iterations = request.json['iterations']
    db.designs.find_and_modify(query={'id': design_id}, update={"$set": {
        'style_image_name': style_image_name, 
        'content_layer': content_layer,
        'style_layers': style_layers,
        'content_weight': content_weight,
        'style_weight': style_weight,
        'iterations': iterations
    }})
    design_data = db.designs.find_one({"id": design_id})
    design_json = json_util.dumps(design_data)
    return Response(status=200, response=design_json) if json.loads(json_util.dumps(design_json)) else Response(status=404)
    
# insert new design  
@app.route('/create_design')
@cross_origin()
def create_design():
    # create new unique design_id
    design_id = get_new_design_id()
    # insert new design
    design_data = deepcopy(design_data_default)
    design_data.update(id=design_id)
    db.designs.insert_one(design_data)
    # insert new pin
    pin_data = deepcopy(pin_data_default)
    pin_data.update(id=design_id)
    db.pins.insert_one(pin_data)
    # return created design without Object id
    design_data['_id'] = ''
    return design_data
