from typing import List

from fastapi import APIRouter


router = APIRouter(
    prefix="/metrics",
    tags=["metrics"],
)


@router.post("/correl_matrix")
def correl_matrix(data: dict[str, list[float]]):
    # TODO: make correlation matrix
    pass


@router.post("/metrics")
def metrics(data: dict[str, list[float]]):
    # TODO: return calculated metrics (like RMSE, MAE ...)
    pass


