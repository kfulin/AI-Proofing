# backend/main.py

from fastapi import FastAPI
from api import upload

app = FastAPI()

# Include the upload router
app.include_router(upload.router)
