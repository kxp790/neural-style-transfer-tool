import pymongo

mongodb = pymongo.MongoClient()

style_transfer_db = mongodb['styleTransferDB']

designs_collection = style_transfer_db['designs']
pins_collection = style_transfer_db['pins']
