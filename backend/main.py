from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.services.llm_service import llm
from backend.services.debate_orchestrator import DebateOrchestrator  #controller

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5500",
        "http://localhost:5500",
        "*"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message":"DebateForge Running"}   #testing endpoint

@app.post("/debate")  #main feature endpoint
def debate(topic:str):
    result = DebateOrchestrator(llm).run_debate(topic)
    return result