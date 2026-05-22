import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pouzivatel, PouzivatelResponse } from 'shared-ui';

@Injectable({
    providedIn: 'root'
})
export class PouzivatelService {
    private http = inject(HttpClient);
    pouzivatelZbackend = signal<Pouzivatel[]>([]);

    nacitajPouzivatelov() {
        this.http.get<PouzivatelResponse>('http://localhost:8000/pouzivatelia').subscribe(res => {
            this.pouzivatelZbackend.set(res.pouzivatel);
        });
    }
}