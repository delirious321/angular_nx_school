import { CommonModule } from '@angular/common';
import { Component, input} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Pouzivatel } from './pouzivatel.interface'





@Component({
  selector: 'lib-karta',
  imports: [CommonModule,CardModule,ButtonModule],
  templateUrl: './karta.html',
  styleUrl: './karta.css',
})
export class Karta {
  pouzivatel = input.required<Pouzivatel>();
}


