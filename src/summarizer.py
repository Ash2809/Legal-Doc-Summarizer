# from pdf_reader import extract_text_from_pdf
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
import os  
from dotenv import load_dotenv 

def summarize_text(text, llm):
    system = f"""You are given a text from a legal. Summarize this report.Summarize in a manner such that it is easy 
    to understand.Summarize in 200 words. Do not add anything extra. Do not remove anything. Stay adhered to context. text : {text}"""

    result = llm.invoke(system).content
    
    return result

if __name__ == "__main__": 
    load_dotenv()
    GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
    llm = ChatGoogleGenerativeAI(api_key = GOOGLE_API_KEY, model = "gemini-1.5-flash",temperature = 0.1)
    
    # text = extract_text_from_pdf(r"C:\Users\aashutosh kumar\Downloads\Service_bond.pdf")
    print(summarize_text(text, llm))