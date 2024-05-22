from fastapi import APIRouter

from .filter_router import router as filter_router


router = APIRouter(prefix="/v1")
router.include_router(filter_router)
