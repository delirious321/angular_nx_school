from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import json
import os

app = FastAPI(title="projekt")

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods = ["*"],
    allow_headers = ["*"],
    allow_credentials = True
)

CURRENT_DIR = os.path.dirname(os.path.abspath(__file__)) #moze byt aj priamo cesta data/ kedze mam tam jsony

@app.get("/status")
def precitaj_status_systemu():
    return {"sprava": "Backend ide"}

@app.get("/pouzivatelia")
def ziskaj_pouzivatelov():
    cesta_k_db = os.path.join(CURRENT_DIR, "data", "pouzivatelia.json")
    
    with open(cesta_k_db, "r") as subor:
        data_o_pouzivateloch = json.load(subor)
    return data_o_pouzivateloch


@app.get("/shop")
def obchod():
    cesta_k_obchodu = os.path.join(CURRENT_DIR, "data", "obchod.json")
    
    with open(cesta_k_obchodu, "r") as subor:
        data_obchod = json.load(subor)
    return data_obchod


