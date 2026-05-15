import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Karta } from 'shared-ui';
@Component({
  imports: [RouterModule, Karta],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'app1';
}
