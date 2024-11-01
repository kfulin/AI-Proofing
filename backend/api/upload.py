# backend/api/upload.py

from fastapi import APIRouter, File, UploadFile, Form
import shutil
import os

router = APIRouter()

UPLOAD_DIR = "uploaded_images"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload")
async def upload_file(file: UploadFile = File(...), label: str = Form(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Save label information (for demonstration, we just print it)
    print(f"Received file: {file.filename} with label: {label}")

    return {"filename": file.filename, "label": label, "status": "success"}
