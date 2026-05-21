import { Component, inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'lib-produkt-detail',
  imports: [ButtonModule, InputNumberModule, RatingModule, FormsModule, TagModule, BreadcrumbModule, RouterLink],
  templateUrl: './produkt_detail.html',
})
export class ProduktDetail {
    router = inject(Router)
    produkt = this.router.currentNavigation()?.extras?.state?.['data'];

     get hodnotenieCislo(): number {
    return parseFloat(this.produkt().hodnotenie.split('/')[0]);
  }
  }

