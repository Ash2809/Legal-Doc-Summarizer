import easyocr
import os  
from dotenv import load_dotenv 


def ocr_image(image_path, llm):
    reader = easyocr.Reader(['en'])
    result = reader.readtext(image_path)
    response = [detection[1] for detection in result]

    return " ".join(response)

if __name__ == "__main__":
    load_dotenv()
    GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
    llm = ChatGoogleGenerativeAI(api_key = GOOGLE_API_KEY, model = "gemini-1.5-flash",temperature = 0.1)

    image_path = r"C:\Users\aashutosh kumar\Downloads\Screenshot 2025-03-13 211717.png"
    print(ocr_image(image_path, llm))


