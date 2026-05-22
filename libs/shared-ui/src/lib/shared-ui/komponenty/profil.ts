import { Component, inject, OnInit } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { PouzivatelService } from '../pouzivatel.service';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { RouterLink } from '@angular/router';
import { HornaLista } from './horna_lista';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'lib-profil',
  imports: [AvatarModule, ButtonModule, TagModule, DividerModule, RouterLink, HornaLista, BreadcrumbModule],
  templateUrl: './profil.html',
})
export class Profil implements OnInit {
  pouzivatel = inject(PouzivatelService);

  breadcrumb: MenuItem[] = [
    { label: 'Obchod', routerLink: '/shop' },
    { label: 'Profil' }
  ];
  home: MenuItem = { icon: 'pi pi-home', routerLink: '/shop' };

  ngOnInit() {
    if (this.pouzivatel.pouzivatelZbackend().length === 0) {
      this.pouzivatel.nacitajPouzivatelov();
    }
  }
}
