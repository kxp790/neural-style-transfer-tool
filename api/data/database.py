import pymongo

mongodb = pymongo.MongoClient()

style_transfer_db = mongodb['styleTransferDB']

designs_collection = style_transfer_db['designs']
pins_collection = style_transfer_db['pins']

def make_sample_data():
    designs_data = {
        'id' : 'af2iak2jh3',
        'style_image_name' : 'stained-glass.jpg',
        'layers' : {
            'block1_conv1': 0.2,
            'block2_conv1': 0.3,
            'block3_conv1': 0.3,
            'block4_conv1': 0.10,
            'block5_conv1': 0.15
        },
        'content_wight' : 20,
        'style_weight' : 30
    }
    designs_collection.insert_one(designs_data)

    pins_data = {
        'id' : 'af2iak2jh3',
        'pin' : 1234
    }
    pins_collection.insert_one(pins_data)
