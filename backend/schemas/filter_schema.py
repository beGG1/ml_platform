from typing import List, Any

from pydantic import BaseModel


class FilterInput(BaseModel):
    name: str
    input_type: str


class FilterSchema(BaseModel):
    name: str
    description: str
    inputs: List[FilterInput]


class FilterGetAllResponse(BaseModel):
    filters: List[FilterSchema]
