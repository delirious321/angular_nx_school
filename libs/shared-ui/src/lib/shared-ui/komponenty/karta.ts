import { CommonModule } from '@angular/common';
import { Component, inject, input} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PouzivatelService, Shop, ShopGrid, ShopGridService } from 'shared-ui';
import { DividerModule } from 'primeng/divider'
import { ViewEncapsulation } from '@angular/core'



@Component({
  selector: 'lib-karta',
  imports: [CommonModule,CardModule,ButtonModule, DividerModule],
  templateUrl: './karta.html',
  styleUrl: './karta.css',
  encapsulation: ViewEncapsulation.None
})
export class Karta {
  pouzivatelService = inject(PouzivatelService);
  shopgrid = inject(ShopGridService)
  poradie = input.required<ShopGrid>();
}


