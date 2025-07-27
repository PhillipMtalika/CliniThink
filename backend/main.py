from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from transformers import pipeline
from typing import List, Any
import re

app = FastAPI(title="CliniThink AI Backend - Bio_ClinicalBERT")

# Load the fill-mask pipeline with Bio_ClinicalBERT
pipe = pipeline("fill-mask", model="emilyalsentzer/Bio_ClinicalBERT")

class SymptomInput(BaseModel):
    symptoms: str

class MaskedResult(BaseModel):
    sequence: str
    score: float
    token: int
    token_str: str

@app.post("/analyze")
def analyze(input: SymptomInput) -> List[Any]:
    # Accept both [MASK] and <mask> for user convenience
    text = input.symptoms.replace("<mask>", "[MASK]")
    # Count [MASK] tokens
    mask_count = len(re.findall(r"\[MASK\]", text))
    if mask_count != 1:
        raise HTTPException(
            status_code=400,
            detail=f"Input must contain exactly one [MASK] token. Found {mask_count}. Example: 'The patient has a persistent [MASK] and fever.'"
        )
    result = pipe(text)
    return result

@app.get("/")
def root():
    return {"message": "CliniThink AI Backend with Bio_ClinicalBERT is running!"} 