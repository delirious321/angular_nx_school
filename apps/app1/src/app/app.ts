import { Component, OnInit, signal, inject} from '@angular/core';
import { RouterModule } from '@angular/router';
import {Pouzivatel, PouzivatelResponse, ShopGrid, ShopGridResponse, PouzivatelService, ShopGridService} from 'shared-ui';
import { HttpClient} from '@angular/common/http';


@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected title = 'app1';
  
  private http = inject(HttpClient);
  private pouzivatelService = inject(PouzivatelService)
  private shopGridService = inject(ShopGridService)

  odpovedZbackendu = signal<string>('nacitavam');
  pouzivateliaBackend = signal<Pouzivatel[]>([]);
  shopGridyOdpoved = signal<ShopGrid[]>([]);
  ngOnInit() { 

    this.http.get<{ sprava:string }>('http://localhost:8000/status')
    .subscribe(
      {
        next: (data) => {
          this.odpovedZbackendu.set(data.sprava);
        },
        error: (err) => {
          this.odpovedZbackendu.set('Nepodarilo sa')
          console.log(err)
        }
      });
      this.http.get<PouzivatelResponse>('http://localhost:8000/pouzivatelia')
      .subscribe({
        next: (data) => {
          this.pouzivatelService.pouzivatelZbackend.set(data.pouzivatel);

        },
        error: (err) => {
          console.log("nenajdeny pouzivatelia");
        }
      }); 
    
    this.http.get<ShopGridResponse>('http://localhost:8000/shop')
    .subscribe({
      next: (data) => {
        this.shopGridService.ShopGridyOdpoved.set(data.grids); //nastavim injector na tuto hodnotu ktoru mozem do hocijakeho komponentu inectnut a pouzit !
        console.log(data.grids)
      },
      error: (err) => {
        console.log('nenaslo sa info  o shopgride');
      }
    });




  }

}
