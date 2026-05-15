from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI(title="projekt")

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods = ["*"],
    allow_headers = ["*"],
    allow_credentials = True
)


@app.get("/status")
def precitaj_status_systemu():
    return {"sprava": "Backend ide"}

@app.get("/pouzivatelia")
def ziskaj_pouzivatelov():
    with open("data/db.json", "r") as subor:
        data_o_pouzivateloch = json.load(subor)
    return data_o_pouzivateloch




