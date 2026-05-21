import { Routes } from '@angular/router';
import { Karta, Shop, Profil, ProduktDetail } from 'shared-ui';
export const appRoutes: Routes = [
    { path: '', component: Shop},
    { path: 'profil', component: Profil},
    { path: 'produkt', component: ProduktDetail},
    //spat
    { path: 'shop', component: Shop}
];
