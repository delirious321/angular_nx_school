import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'lib-karta',
  imports: [CommonModule,CardModule,ButtonModule],
  templateUrl: './karta.html',
  styleUrl: './karta.css',
})
export class Karta {}


