import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Shop dich arm';
  username: string = '';
  password: string = '';

  onLogin() {
    if (this.username && this.password) {
      console.log('Login erfolgreich:', this.username);
      // Hier könntest du zu einer anderen Route navigieren oder Auth-Logik einfügen
    } else {
      console.log('Bitte Benutzername und Passwort eingeben!');
    }
  }
}
