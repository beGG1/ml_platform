from typing import List

from fastapi import APIRouter

from backend.schemas.filter_schema import FilterGetAllResponse, FilterSchema, FilterInput

router = APIRouter(
    prefix="/filter",
    tags=["filter"],
)


@router.get("/get_filters", response_model=FilterGetAllResponse)
def get_filters():
    # TODO: Get all filters that are availible
    pass


@router.post("/filter", response_model=FilterSchema)
def filter():
    # TODO: Make resp and req models + filters
    ...
