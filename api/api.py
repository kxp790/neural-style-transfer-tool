import os
from flask import Flask, flash, request, redirect, url_for, session, send_file
from pathlib import Path
import time
from werkzeug.utils import secure_filename
from shutil import copyfile
import model
from data.database import get_model_design_data

app = Flask(__name__)

# path to inputs
INPUT_FOLDER = 'data/input'
app.config['INPUT_FOLDER'] = INPUT_FOLDER

# path to outputs
OUTPUT_FOLDER = 'data/output'
app.config['OUTPUT_FOLDER'] = OUTPUT_FOLDER

# disable caching
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

# image name hardcoded for testing purposes until model design id's work 
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
            file.save(INPUT_FOLDER + image_name)
            # get styled image
            model.style_transfer(image_name, 'stained-glass')
            # redirect when done
            return redirect('http://localhost:3000/result')

# send input image
@app.route('/input/test', methods=['GET'])
def get_input_image():
    return send_file(INPUT_FOLDER + '/' + image_name)

# send output image
@app.route('/output/test', methods=['GET'])
def get_output_image():
    return send_file(OUTPUT_FOLDER + '/' + image_name)
    