from fastapi import APIRouter, UploadFile, File
from fastapi.responses import StreamingResponse
from PIL import Image
import io
from model import run_ocr

router = APIRouter()

@router.post("/ocr-stream")
async def ocr_stream(file: UploadFile = File(...)):
    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).convert("RGB")

    def generate():
        text = run_ocr(image)
        for word in text.split():
            yield word + " "

    return StreamingResponse(generate(), media_type="text/plain")