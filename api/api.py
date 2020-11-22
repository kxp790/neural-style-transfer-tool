import os
from flask import Flask, flash, request, redirect, url_for, session, send_file
from pathlib import Path
import time
from werkzeug.utils import secure_filename
from shutil import copyfile
from model import model

app = Flask(__name__)

# path to uploads
UPLOAD_FOLDER = 'data/upload'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# disable caching
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

# input and output filenames (hardcoded) 
filename_before = 'before.jpg'
filename_after = 'after.jpg'
# TODO - database (hardcoded until ML model is ready)

# receive image and style it
@app.route('/', methods=['POST'])
def upload_file():
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
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename_before))
            copyfile(UPLOAD_FOLDER + '/' + filename_before, UPLOAD_FOLDER + '/' + filename_after)
            # get styled image
            model.get_styled_image(filename_after)
            # redirect when done
            return redirect('http://localhost:3000')

# send input image
@app.route('/before', methods=['GET'])
def get_before():
    return send_file(UPLOAD_FOLDER + '/' + filename_before)

# send result image
@app.route('/after', methods=['GET'])
def get_after():
    return send_file(UPLOAD_FOLDER + '/' + filename_after)
    