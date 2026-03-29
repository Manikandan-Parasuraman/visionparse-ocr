from transformers import TrOCRProcessor, VisionEncoderDecoderModel
from PIL import Image
import torch

# Load model and processor
processor = TrOCRProcessor.from_pretrained('microsoft/trocr-base-printed')
model = VisionEncoderDecoderModel.from_pretrained('microsoft/trocr-base-printed')

def run_ocr(image: Image.Image) -> str:
    """
    Run OCR on an image using TrOCR model
    """
    try:
        # Process the image
        pixel_values = processor(images=image, return_tensors="pt").pixel_values

        # Generate text
        generated_ids = model.generate(
            pixel_values,
            max_length=50,
            num_beams=4,
            early_stopping=True
        )

        # Decode the generated text
        generated_text = processor.batch_decode(generated_ids, skip_special_tokens=True)[0]

        return generated_text.strip()
    except Exception as e:
        return f"OCR Error: {str(e)}"
