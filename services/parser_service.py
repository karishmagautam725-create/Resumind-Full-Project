from pathlib import Path
from docx import Document
import fitz


def extract_text(file_path):

    extension = Path(file_path).suffix.lower()

    if extension == ".pdf":
        return extract_pdf_text(file_path)

    elif extension == ".docx":
        return extract_docx_text(file_path)

    else:
        raise ValueError("Unsupported File Format")


def extract_pdf_text(file_path):

    text = ""

    pdf = fitz.open(file_path)

    for page in pdf:
        page_text = page.get_text()

        if page_text:
            text += page_text

    pdf.close()

    return text.strip()


def extract_docx_text(file_path):

    text = []

    doc = Document(file_path)

    for para in doc.paragraphs:

        if para.text.strip():
            text.append(para.text)

    return "\n".join(text).strip()