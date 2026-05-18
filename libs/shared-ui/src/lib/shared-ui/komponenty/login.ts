import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule} from 'primeng/inputtext';
@Component({
  selector: 'lib-login',
  imports: [InputTextModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
    value: string | undefined;
}
