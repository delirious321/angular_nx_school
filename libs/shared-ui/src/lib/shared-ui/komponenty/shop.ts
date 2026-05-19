import { Component, inject} from '@angular/core';
import { Karta } from './karta';
import { ShopGridService } from '../shop.service';
@Component({
  selector: 'lib-shop',
  imports: [Karta],
  templateUrl: './shop.html',
  styleUrl: './shop.css',
})
export class Shop {
  shopgrid = inject(ShopGridService)

}
