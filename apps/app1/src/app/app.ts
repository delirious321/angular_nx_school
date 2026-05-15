import { Component, OnInit, signal, inject} from '@angular/core';
import { RouterModule } from '@angular/router';
import { Karta, Pouzivatel, PouzivatelResponse } from 'shared-ui';
import { HttpClient} from '@angular/common/http';


@Component({
  imports: [RouterModule, Karta],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected title = 'app1';
  
  private http = inject(HttpClient);


  odpovedZbackendu = signal<string>('nacitavam');
  pouzivateliaBackend = signal<Pouzivatel[]>([]);
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
          console.log('toto prislo', data)
          this.pouzivateliaBackend.set(data.pouzivatel);

        },
        error: (err) => {
          console.log("nenajdeny pouzivatelia");
        }
      });
  }
}
