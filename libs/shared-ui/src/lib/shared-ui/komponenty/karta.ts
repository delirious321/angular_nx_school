import { CommonModule } from '@angular/common';
import { Component, inject, input} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PouzivatelService } from 'shared-ui';
import { DividerModule } from 'primeng/divider'




@Component({
  selector: 'lib-karta',
  imports: [CommonModule,CardModule,ButtonModule, DividerModule],
  templateUrl: './karta.html',
  styleUrl: './karta.css',
})
export class Karta {
  pouzivatelService = inject(PouzivatelService);
  value = undefined 
}


