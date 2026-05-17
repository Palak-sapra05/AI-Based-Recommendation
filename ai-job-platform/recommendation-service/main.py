from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import random

app = FastAPI()

class UserProfile(BaseModel):
    user_id: int
    skills: List[str]
    interests: List[str]

class JobRecommendation(BaseModel):
    job_title: str
    company: str
    match_score: float
    required_skills: List[str]

@app.get("/health")
def health_check():
    return {"status": "Recommendation Service is running"}

@app.post("/recommend/jobs", response_model=List[JobRecommendation])
def recommend_jobs(profile: UserProfile):
    # Mock AI matching logic
    jobs = [
        {"job_title": "Full Stack Developer", "company": "Tech Corp", "required_skills": ["React", "Node.js", "SQL"]},
        {"job_title": "Data Scientist", "company": "AI Labs", "required_skills": ["Python", "TensorFlow", "Pandas"]},
        {"job_title": "DevOps Engineer", "company": "Cloud Systems", "required_skills": ["Docker", "Kubernetes", "AWS"]},
        {"job_title": "Frontend Engineer", "company": "Creative Studio", "required_skills": ["React", "CSS", "TypeScript"]},
    ]
    
    recommendations = []
    for job in jobs:
        # Calculate overlap
        overlap = len(set(profile.skills) & set(job["required_skills"]))
        score = (overlap / len(job["required_skills"])) * 100 if job["required_skills"] else 0
        recommendations.append({
            "job_title": job["job_title"],
            "company": job["company"],
            "match_score": round(score, 2),
            "required_skills": job["required_skills"]
        })
    
    # Sort by match score
    recommendations.sort(key=lambda x: x["match_score"], reverse=True)
    return recommendations[:5]

@app.post("/recommend/skills")
def recommend_skills(profile: UserProfile):
    all_skills = ["React", "Node.js", "Python", "Docker", "AWS", "Kubernetes", "TensorFlow", "GraphQL", "TypeScript"]
    missing_skills = list(set(all_skills) - set(profile.skills))
    suggested = random.sample(missing_skills, min(len(missing_skills), 3))
    return {"suggested_skills": suggested}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
