import os
from dotenv import load_dotenv
from fastapi import FastAPI, File, UploadFile
import uvicorn
from langchain_google_genai import ChatGoogleGenerativeAI
from src.pdf_reader import extract_text_from_pdf
from src.ocr import ocr_image
from src.summarizer import summarize_text
from io import BytesIO

load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

llm = ChatGoogleGenerativeAI(api_key=GOOGLE_API_KEY, model="gemini-1.5-flash", temperature=0.1)

app = FastAPI()

@app.post("/process_pdf/")
async def process_pdf(file: UploadFile = File(...)):
    pdf_content = await file.read()
    extracted_text = extract_text_from_pdf(BytesIO(pdf_content))
    summary = summarize_text(extracted_text, llm)
    return {"extracted_text": extracted_text[:500], "summary": summary}

@app.post("/process_image/")
async def process_image(file: UploadFile = File(...)):
    image_content = await file.read()
    extracted_text = ocr_image(BytesIO(image_content))
    summary = summarize_text(extracted_text, llm)
    return {"extracted_text": extracted_text[:500], "summary": summary}

def main():
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)

if __name__ == "__main__":
    main()
