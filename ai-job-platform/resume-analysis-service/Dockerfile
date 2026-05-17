FROM python:3.9-slim
WORKDIR /app
RUN pip install fastapi uvicorn python-multipart
COPY . .
EXPOSE 8001
CMD ["python", "main.py"]
