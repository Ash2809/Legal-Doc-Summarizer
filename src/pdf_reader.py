import fitz  
from io import BytesIO

def extract_text_from_pdf(pdf_data: BytesIO) -> str:
    extracted_text = []
    
    with fitz.open(stream=pdf_data.getvalue(), filetype="pdf") as doc:
        for page in doc:
            extracted_text.append(page.get_text("text")) 
    
    return "\n".join(extracted_text)


if __name__ == "__main__":
    path = r"C:\Users\aashutosh kumar\Downloads\Service_bond.pdf"
    pdf_text = extract_text_from_pdf(path)
    print(pdf_text)
