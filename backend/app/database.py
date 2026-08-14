import os
from motor.motor_asyncio import AsyncIOMotorClient

class Database:
    client: AsyncIOMotorClient = None
    db = None

db_manager = Database()

async def connect_to_mongo():
    uri = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
    db_manager.client = AsyncIOMotorClient(uri)
    db_manager.db = db_manager.client["blinxlab"]

async def close_mongo_connection():
    if db_manager.client:
        db_manager.client.close()

def get_db():
    return db_manager.db
