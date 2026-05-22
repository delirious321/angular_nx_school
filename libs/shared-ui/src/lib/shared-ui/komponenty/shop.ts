import { Component, inject } from '@angular/core';
import { Karta } from './karta';
import { ShopGridService } from '../shop.service';
import { HornaLista } from './horna_lista';
import { Router } from '@angular/router';
import { ShopGrid } from 'shared-ui';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'lib-shop',
  imports: [Karta, HornaLista, TagModule, ButtonModule],
  templateUrl: './shop.html'
})
export class Shop {
  shopgrid = inject(ShopGridService);
  router = inject(Router);

  otvorDetail(produkt: ShopGrid) {
    this.router.navigateByUrl('/produkt', { state: { data: produkt } });
  }
}
