from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(title="projekt")

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods = ["*"],
    allow_headers = ["*"],
    allow_credentials = True
)


class User(BaseModel):  #pouzivatel trieda
    meno: str
    priezvisko: str
    email: str

@app.get("/status")
def precitaj_status_systemu():
    return {"sprava": "Backend ide"}

    
@app.post("/users")
def vytvor_pouzivatela(user: User):
    return {"sprava":"Pouzivatel pridany","data": user}

