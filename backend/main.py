from fastapi import FastAPI
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

from backend.api.routers import router

app = FastAPI()

app.include_router(router)


@app.get("/")
async def root():
    return {"message": "Hello World"}


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)

