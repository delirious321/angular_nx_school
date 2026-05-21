import { CommonModule } from '@angular/common';
import { Component, inject, input} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PouzivatelService, Shop, ShopGrid, ShopGridService } from 'shared-ui';
import { DividerModule } from 'primeng/divider'
import { ViewEncapsulation } from '@angular/core'
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';



@Component({
  selector: 'lib-karta',
  imports: [CommonModule,CardModule,ButtonModule, DividerModule, TagModule, RatingModule, FormsModule],
  templateUrl: './karta.html',
  
})
export class Karta {
  pouzivatelService = inject(PouzivatelService);
  shopgridService = inject(ShopGridService)
  karta_info = input.required<ShopGrid>();
}


