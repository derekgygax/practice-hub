from typing import List
from uuid import UUID, uuid4

from fastapi import FastAPI, HTTPException
from models import Gender, Role, User

app = FastAPI()

# DB ... this doesn't seem real though, you have to get to that
db: List[User] = [
    User(
        id=UUID("a7852160-02fe-47a8-980a-1bf0b956b2ea"), 
        first_name="Jackelyn", 
        last_name="Cunt", 
        gender=Gender.female,
        roles=[Role.student]
    ),
    User(
        id=UUID("cc0c54c7-578d-4f0d-8021-78a5c135f3d5"), 
        first_name="Josh", 
        last_name="Dick", 
        gender=Gender.male,
        roles=[Role.admin, Role.user]
    )
]

# Use async and await like node
# @app.get('/')
# async def root():
#   await foo()
#   return {
#     "Hello": "world"
#   }

@app.get('/')
def root():
    return {
        "Hello": "world"
    }

@app.get("/api/v1/users")
async def fetch_users():
    return db

@app.post("/api/v1/users")
async def register_user(user: User):
    db.append(user)
    return {
        "id": user.id
    }

@app.delete("/api/v1/users/{id}")
async def delete_user(id: UUID):
    # NO like this way but it works and is maybe the quickest
    # given the structure
    for user in db:
        if user.id == id:
            print(user)
            db.remove(user)
            return
        
    raise HTTPException(
        status_code=404,
        detail=f"user with id: {id} does not exist"
    )