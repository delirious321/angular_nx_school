from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:4200', 'http://127.0.0.1:4200'],
    allow_methods = ["*"],
    allow_headers = ["*"],
)


class User(BaseModel):
    meno: str
    priezvisko: str
    email: str



    
@app.post("/users")
def vytvor_pouzivatela(user: User):
    return {"sprava":"Pouzivatel pridany","data": user}

