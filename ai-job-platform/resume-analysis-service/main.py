# pyrefly: ignore [missing-import]
from fastapi import FastAPI, UploadFile, File
import random

app = FastAPI()

@app.get("/health")
def health():
    return {"status": "Resume Analysis Service is running"}

@app.post("/analyze")
async def analyze_resume(file: UploadFile = File(...)):
    # Mock analysis logic
    skills = ["React", "Python", "Docker", "Node.js"]
    experience_years = random.randint(1, 10)
    
    return {
        "filename": file.filename,
        "extracted_skills": skills,
        "experience_years": experience_years,
        "parsed_data": {
            "name": "Alex Johnson",
            "education": "BS in Computer Science"
        }
    }

if __name__ == "__main__":
    # pyrefly: ignore [missing-import]
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
