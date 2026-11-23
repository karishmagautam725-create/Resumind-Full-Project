# from langchain_chroma import Chroma


# from apps.ai.rag.embeddings import get_embeddings
# from apps.ai.rag.splitter import split_text

# def get_vectorstore():
#     return Chroma(
#         collection_name="resume_documents",
#         embedding_function=get_embeddings(),
#         persist_directory="/app/chroma_db",
#     )





# def index_resume(resume):

#     chunks = split_text(resume.extracted_text)

#     vectorstore = get_vectorstore()

#     documents = vectorstore.add_texts(
#         texts=chunks,
#         metadatas=[
#             {
#                 "resume_id": resume.id,
#                 "user_id": resume.user_id,
#             }
#             for _ in chunks
#         ],
#     )

#     return documents