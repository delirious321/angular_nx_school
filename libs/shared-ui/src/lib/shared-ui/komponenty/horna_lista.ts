import { Component, OnInit, inject } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { PouzivatelService } from '../pouzivatel.service';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'lib-horna-lista',
  imports: [MenubarModule, AvatarModule, InputTextModule, RouterLink],
  templateUrl: './horna_lista.html',
  
})
export class HornaLista implements OnInit{

    pouzivatelService = inject(PouzivatelService)


  items: MenuItem[] | undefined;


  ngOnInit() {
    this.pouzivatelService.nacitajPouzivatelov();
    this.items = [
      {
        label: 'Domov',
        icon: 'pi pi-home'
      },
      {
        label: 'O nás',
        icon: 'pi pi-star'
      },
      {
        label: 'Produkty',
        icon: 'pi pi-search',
        items: [
          {
            label: 'Elektronika',
            icon: 'pi pi-bolt'
          },
          {
            label: 'Iná výbava',
            icon: 'pi pi-pallete'
          },
          {
            label: 'Školské pomôcky',
            icon: 'pi pi-pencil'
          }
        ]
      },
      {
        label: 'Kariéra',
        icon: 'pi pi-server'
      },
      {
        label: 'Kontaktovať',
        icon: 'pi pi-envelope'
      }
    ];


  }
  }

