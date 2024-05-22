from typing import List

from fastapi import APIRouter

from backend.schemas.filter_schema import FilterGetAllResponse, FilterSchema, FilterInput

router = APIRouter(
    prefix="/filter",
    tags=["filter"],
)


@router.get("/", response_model=FilterGetAllResponse)
def get_filters():
    a = FilterInput(
        name="lol1",
        input_type="str",
    )
    b = FilterSchema(
        name="lol",
        description="lol",
        inputs=[a]
    )
    return FilterGetAllResponse(filters=[b])
