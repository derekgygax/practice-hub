from asyncio import all_tasks
from datetime import datetime
from fastapi import FastAPI, APIRouter, HTTPException

from configurations import collection
from database.models import Todo
from database.schemas import all_tasks

from bson.objectid import ObjectId

app = FastAPI()
router = APIRouter()

@router.get("/")
async def get_all_todos():
    # Only get things that have NOT been deleted
    data = collection.find({"is_deleted": False})
    return all_tasks(data)


@router.post("/")
async def create_task(new_task: Todo):
    try:
        resp = collection.insert_one(dict(new_task))
        return {
            "status_code": 200,
            "id": str(resp.inserted_id)
        }
    except Exception as e:
        return HTTPException(status_code=500, detail=f"Some error {e}")

@router.put("/{task_id}")
async def update_task(task_id: str, updated_task: Todo):
    # YOU NEED need to use _id
    try:
        # Because remember how in mongoDB the _id is different than the real id
        # like its not a string
        id = ObjectId(task_id)
        # You are ONLY getting documents you have NOT deleted (marked as deleted in the DB)
        existing_doc = collection.find_one({"_id": id, "is_deleted": False})
        if not existing_doc:
            return HTTPException(status_code=404, detail=f"Task does NOT exist")
        # MongoDB for updating a thing
        # first param to identify the document, then pass in the updated thing
        updated_task.updated_at = datetime.timestamp(datetime.now())
        resp = collection.update_one(
            {
                "_id": id
            },
            {
                "$set": dict(updated_task)
            }
        )
        return {
            "status_code": 200,
            "message": "Task updated successfully"
        }
    except Exception as e:
        return HTTPException(status_code=500, detail=f"Some error {e}")

@router.delete("/{task_id}")
async def delete_task(task_id: str):
    # YOU NEED need to use _id
    try:
        # Because remember how in mongoDB the _id is different than the real id
        # like its not a string
        id = ObjectId(task_id)
        # You are ONLY getting documents you have NOT deleted (marked as deleted in the DB)
        existing_doc = collection.find_one({"_id": id, "is_deleted": False})
        if not existing_doc:
            return HTTPException(status_code=404, detail=f"Task does NOT exist")
        # MongoDB for updating a thing
        # first param to identify the document, then pass in the updated thing
        resp = collection.update_one(
            {
                "_id": id
            },
            {
                "$set": {"is_deleted": True}
            }
        )
        # To delete from the DB
        # collection.delete_one({"_id": id})
        return {
            "status_code": 200,
            "message": "Task Deleted Successfully"
        }
    except Exception as e:
        return HTTPException(status_code=500, detail=f"Some error {e}")


app.include_router(router=router)





# @app.get("/")
# async def homePage():
# 	return "Welcome to Mongo DB Fast API tutorial"