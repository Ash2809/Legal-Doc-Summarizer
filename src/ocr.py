from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
import easyocr
import numpy as np
import cv2
from io import BytesIO
from dotenv import load_dotenv
import os

reader = easyocr.Reader(["en"])

def ocr_image(image_data: BytesIO) -> str:
    image_bytes = np.frombuffer(image_data.getvalue(), dtype=np.uint8)
    image = cv2.imdecode(image_bytes, cv2.IMREAD_COLOR)

    if image is None:
        raise ValueError("Error decoding image. Make sure the uploaded file is a valid image.")

    results = reader.readtext(image)
    
    extracted_text = " ".join([text for (_, text, _) in results])  
    return extracted_text


if __name__ == "__main__":
    load_dotenv()
    GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
    llm = ChatGoogleGenerativeAI(api_key = GOOGLE_API_KEY, model = "gemini-1.5-flash",temperature = 0.1)

    image_path = r"C:\Users\aashutosh kumar\Downloads\Screenshot 2025-03-13 211717.png"
    print(ocr_image(image_path, llm))


