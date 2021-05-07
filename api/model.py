# this code is based on https://www.tensorflow.org/tutorials/generative/style_transfer code samples
# the used code samples are licensed under the Apache 2.0 License https://www.apache.org/licenses/LICENSE-2.0 

import os
import tensorflow as tf
import time
import image_processing

JPG = '.jpg'

# path to input, style and output folders
INPUT_FOLDER = 'data/input/'
STYLE_FOLDER = 'data/style/'
OUTPUT_FOLDER = 'data/output/'

# default content and style layers
content_layers = []
style_layers = []

# default weights for different style layers
style_layer_weights = {}

# default style vs content weights
content_weight = 0
style_weight = 0
num_of_iterations = 0

# function called by the API to trigger style transfer
def style_transfer(design):
    # load images
    content_image = image_processing.preprocess_image(OUTPUT_FOLDER + design['id'] + JPG)
    style_image = image_processing.preprocess_image(STYLE_FOLDER + design['style_image_name'])
    
    # load layers
    content_layers.append(design['content_layer'])
    for key, value in design['style_layers'].items():
        style_layers.append(key)
        style_layer_weights[key] = float(value)

    # load other variables
    global content_weight, style_weight, num_of_iterations
    content_weight = int(design['content_weight'])
    style_weight = int(design['style_weight'])
    num_of_iterations = int(design['iterations'])

    # extract the style and content features 
    extractor = entire_model(style_layers, content_layers)
    style_targets = extractor(style_image)['style']
    content_targets = extractor(content_image)['content']
    
    # define a tf.Variable to contain the image to optimize
    generate_image = tf.Variable(content_image)
    
    # define an optimiser
    optimiser = tf.optimizers.Adam(learning_rate=0.05, beta_1=0.99, epsilon=1e-1)
    
    start = time.time()

    for i in range(num_of_iterations):
        print(f'Style Transfer Step #{i}')
        update_image(generate_image, extractor, style_targets, content_targets, optimiser)
        # for the last step of the transfer save the result and print the the process took
        if(i==(num_of_iterations - 1)):
            image = generate_image.read_value()
            file_path = OUTPUT_FOLDER + design['id'] + JPG
            image_processing.tensor_to_image(image).save(file_path)
            end = time.time()
            print("Total time: {:.1f}".format(end-start))
        
# builds the VGG model
def vgg_model(layer_names):
    vgg = tf.keras.applications.VGG16(include_top=False, weights='imagenet')
    vgg.trainable = False
    outputs = [vgg.get_layer(name).output for name in layer_names]
    model = tf.keras.Model([vgg.input], outputs)
    return model

# builds a model that returns the style and content tensors
class entire_model(tf.keras.models.Model):
    def __init__(self, style_layers, content_layers):
        super(entire_model, self).__init__()
        self.vgg = vgg_model(style_layers + content_layers)
        self.style_layers = style_layers
        self.content_layers = content_layers
        self.num_style_layers = len(style_layers)
        self.vgg.trainable = False

    def call(self, inputs):
        inputs = inputs * 255.0 
        preprocessed_input = tf.keras.applications.vgg16.preprocess_input(inputs)
        outputs = self.vgg(preprocessed_input) 

        # separate the representations of style and content
        style_outputs, content_outputs = (outputs[:self.num_style_layers], outputs[self.num_style_layers:])
        # calculate the gram matrix for each layer in the style output
        style_outputs = [image_processing.gram_matrix(layer) for layer in style_outputs]

        # content and style representation in dictionaries in a layer by layer manner
        content_dictionary = {content_layer: value
                    for content_layer, value
                    in zip(self.content_layers, content_outputs)}
        style_dict = {style_layer: value
                  for style_layer, value
                  in zip(self.style_layers, style_outputs)}

        # return a dict of dicts with content and style representations
        return {'content': content_dictionary, 'style': style_dict}

# calculate the content and style loss
def loss_function(outputs, style_targets, content_targets):
    style_outputs = outputs['style']
    content_outputs = outputs['content']

    style_loss = tf.add_n([style_layer_weights[name] * tf.reduce_mean((style_outputs[name] - style_targets[name]) ** 2) for name in style_outputs.keys()])
    style_loss *= style_weight / len(style_layers) 

    content_loss = tf.add_n([tf.reduce_mean((content_outputs[name] - content_targets[name]) ** 2) for name in content_outputs.keys()])
    content_loss *= content_weight / len(content_layers)
    
    loss = style_loss + content_loss
    
    return loss

# update the image
def update_image(image, extractor, style_targets, content_targets, optimiser):
    with tf.GradientTape() as tape:
        outputs = extractor(image)
        loss = loss_function(outputs, style_targets, content_targets)

    grad = tape.gradient(loss, image)
    optimiser.apply_gradients([(grad, image)])
    image.assign(image_processing.clip_0_1(image))
