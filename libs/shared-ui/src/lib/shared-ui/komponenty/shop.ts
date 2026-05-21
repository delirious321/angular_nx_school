import { Component, inject} from '@angular/core';
import { Karta } from './karta';
import { ShopGridService } from '../shop.service';
import { HornaLista } from './horna_lista';
@Component({
  selector: 'lib-shop',
  imports: [Karta, HornaLista],
  templateUrl: './shop.html'
})
export class Shop {
  shopgrid = inject(ShopGridService)

}
