import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from src.pdf_reader import extract_text_from_pdf
from src.ocr import ocr_image
from src.summarizer import summarize_text

def main():
    load_dotenv()
    GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

    llm = ChatGoogleGenerativeAI(api_key=GOOGLE_API_KEY, model="gemini-1.5-flash", temperature=0.1)

    print("Choose an option:\n1️ Upload PDF\n2️ Upload Image")
    choice = input("Enter 1 for PDF or 2 for Image: ").strip()

    if choice == "1":
        pdf_path = r"C:\Users\aashutosh kumar\Downloads\Service_bond.pdf"
        if not os.path.exists(pdf_path):
            print("Error: PDF file not found!")
            return

        extracted_text = extract_text_from_pdf(pdf_path)
        print("\nExtracted Text:\n", extracted_text[:500], "...")  


        summary = summarize_text(extracted_text, llm)
        print("\nSummary:\n", summary)

    elif choice == "2":
        image_path = input("Enter the Image file path: ").strip()
        if not os.path.exists(image_path):
            print("Error: Image file not found!")
            return

        extracted_text = ocr_image(image_path, llm)
        print("\nExtracted Text:\n", extracted_text[:500], "...")  

        summary = summarize_text(extracted_text, llm)
        print("\nSummary:\n", summary)

    else:
        print("Invalid choice. Please enter 1 or 2.")

if __name__ == "__main__":
    main()
