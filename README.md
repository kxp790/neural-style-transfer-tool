# Image Style Transfer

Web app for investigating image style transfer with VGG19. Built as a BSc final year project 2020/2021.

### Run
Frontend: \
`yarn start` \
Backend: \
`yarn start-api` \

### Database
From `cd <path_to_your_mongodb>/mongodb/bin` run local MongoDB: \
`./mongod` (to specify data folder add: ` --dbpath=<path_to_mongodb_data>/data/db`) \
`./mongo` \
PyMongo script to create the database: \
`python3 .../api/data/database.py`

### Test
Launch the test runner in interactive watch mode: \
`yarn test`

### Tech Stack
- Python backend
- Flask API
- React JS, SCSS frontend
- MongoDB, PyMongo database