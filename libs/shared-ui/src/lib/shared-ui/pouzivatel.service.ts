import { Injectable, signal} from '@angular/core';
import { Pouzivatel } from 'shared-ui'

@Injectable({
    providedIn: 'root'
})
export class PouzivatelService {
    pouzivatelZbackend = signal<Pouzivatel[]>([]);
}