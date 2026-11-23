# from apps.ai.rag.vectorstore import get_vectorstore


# def retrieve_resume_context(
#     resume_id,
#     user_id,
#     query,
#     k=4,
# ):
#     if not query or not query.strip():
#         raise ValueError("Retrieval query cannot be empty.")

#     if k < 1:
#         raise ValueError("k must be at least 1.")
#     vectorstore = get_vectorstore()

#     results = vectorstore.similarity_search(
#         query,
#         k=k,
#         filter={
#             "$and": [
#                 {"resume_id": {"$eq": resume_id}},
#                 {"user_id": {"$eq": user_id}},
#             ]
#         },
#     )

#     return results