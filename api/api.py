

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

JPG = '.jpg'

# path to inputs
INPUT_FOLDER = 'data/input'
app.config['INPUT_FOLDER'] = INPUT_FOLDER

# path to outputs
OUTPUT_FOLDER = 'data/output'
app.config['OUTPUT_FOLDER'] = OUTPUT_FOLDER

# disable caching
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

# default design database entry
design_data_default = {
    'id' : '',
    'style_image_name' : '',
    'content_layer' : '',
    'style_layers' : {},
    'content_weight' : '',
    'style_weight' : '',
    'iterations' : ''
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
@app.route('/upload_image', methods=['POST'])
@cross_origin(origin='http://localhost:3000/model')
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
            file.save(os.path.join(app.config['INPUT_FOLDER'], file.filename))
            copyfile(INPUT_FOLDER + '/' + file.filename, OUTPUT_FOLDER + '/' + file.filename)
            return Response(status=200)
    return Response(status=500)

# get input image
@app.route('/get_input_image/<string:image_name>', methods=['GET'])
@cross_origin()
def get_input_image(image_name):
    # TODO - check if image exists in input folder, 404 if not found
    return send_file(INPUT_FOLDER + '/' + image_name) if os.path.isfile(INPUT_FOLDER + '/' + image_name) else redirect('http://localhost:3000')

# get output image
@app.route('/get_output_image/<string:image_name>', methods=['GET']) 
@cross_origin()
def get_output_image(image_name):
    # TODO - check if image exists in output folder, 404 if not found
    return send_file(OUTPUT_FOLDER + '/' + image_name) if os.path.isfile(OUTPUT_FOLDER + '/' + image_name) else redirect('http://localhost:3000')

# create new design  
@app.route('/create_design', methods=['GET'])
@cross_origin(origin='http://localhost:3000/new_design')
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
    # return created design 
    design_json = json_util.dumps(design_data)
    return Response(status=200, response=design_json) if json.loads(design_json) else Response(status=404)

# check if design and pin combo exists
@app.route('/check_design_with_pin', methods=['POST'])
@cross_origin(origin='http://localhost:3000/resume_design')
def check_design_with_pin():
    design_id = request.json['design_id']
    pin = request.json['pin']
    pin_data = db.pins.find_one({'id': design_id, 'pin': int(pin)})
    if not (json.loads(json_util.dumps(pin_data))):
        return Response(status=401)
    design_data = db.designs.find_one({"id": design_id})

    response_data = dict(
        design = design_data,
        hasImage = os.path.isfile(INPUT_FOLDER + '/' + design_id + JPG)
    )

    design_json = json_util.dumps(design_data)
    response_json = json_util.dumps(response_data)

    return Response(status=200, response=response_json) if json.loads(design_json) else Response(status=500)

# update pin
@app.route('/update_pin', methods=['POST'])
@cross_origin(origin='http://localhost:3000/new_design')
def update_pin():
    design_id = request.json['design_id']
    pin = request.json['pin']
    db.pins.find_and_modify(query={'id': design_id}, update={"$set": {'pin': pin}})
    design_data = db.designs.find_one({"id": design_id})
    design_json = json_util.dumps(design_data)
    return Response(status=200, response=design_json) if json.loads(design_json) else Response(status=404)

# update design
@app.route('/update_design', methods=['POST'])
@cross_origin(origin='http://localhost:3000/model')
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
    return Response(status=200, response=design_json) if json.loads(design_json) else Response(status=404)
    
# get styled image
@app.route('/style_transfer/<string:design_id>', methods=['GET'])
@cross_origin(origin='http://localhost:3000/model')
def style_transfer(design_id):
    design_data = db.designs.find_one({"id": design_id})
    design_parameters = {}
    for parameter in design_data:
        design_parameters[parameter] = design_data[parameter]
    model.style_transfer(design_parameters)
    return Response(status=200) if os.path.isfile(OUTPUT_FOLDER + '/' + design_id + JPG) else Response(status=404)
