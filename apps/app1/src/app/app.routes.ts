import { Routes } from '@angular/router';
import { Karta, Shop, Profil } from 'shared-ui';
export const appRoutes: Routes = [
    { path: '', component: Shop},
    { path: 'profil', component: Profil},
];
