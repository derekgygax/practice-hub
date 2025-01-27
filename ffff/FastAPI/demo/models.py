# using pydantic
# Defining the DB schema

from typing import Optional, List
from uuid import UUID, uuid4
from pydantic import BaseModel, Field
from enum import Enum


class Gender(str, Enum):
    male = "male"
    female = "female"

class Role(str, Enum):
    admin = "admin"
    user = "user"
    student = "student"

class User(BaseModel):
    # Below mean make a uuid if its NOT provided 
    id: Optional[UUID] = Field(default_factory=uuid4)
    first_name: str
    last_name: str
    middle_name: Optional[str] = None
    gender: Gender
    roles: List[Role]    