export interface Pouzivatel {
    meno: string;
    priezvisko: string;
    email: string;
}

export interface PouzivatelResponse {
    pouzivatel: Pouzivatel[]
}