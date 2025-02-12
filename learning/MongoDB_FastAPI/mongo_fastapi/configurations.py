from pydoc import cli
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

import os
from dotenv import load_dotenv

# Load .env variables in the app
load_dotenv()

URI = os.getenv("mongoDB_URL")
if not URI:
    raise ValueError("Database URL is not set. Check your .env file or environment variables.")

# create the client
client = MongoClient(URI, server_api=ServerApi('1'))

# create the DB as todo_db
db = client.todo_db

# create the collection in the db as todo_data
collection = db["todo_data"]

# # Send a ping to confirm a successful connection
# try:
#     client.admin.command("ping")
# except Exception as e:
#     print(e)

