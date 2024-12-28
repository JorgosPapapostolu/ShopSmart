import { CommonModule } from '@angular/common';
import { Component, ɵɵdeferHydrateOnViewport } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [CommonModule, FormsModule]
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string | null = null;

  constructor(private router: Router, private userService: UserService) {}

  register() {
    if (this.password !== this.confirmPassword) {
      console.log("Passwort stimmt nicht überein.")
      this.errorMessage = 'Die Passwörter stimmen nicht überein.';
      return;
    } else if (!this.email || !this.password || !this.confirmPassword) {
      console.log("Alle Felder ausfüllen")
      this.errorMessage = 'Bitte fülle alle Felder aus.';
    }

    this.userService
      .registerUser({ email: this.email, password: this.password })
      .subscribe({
        next: (response) => {
          console.log('Registrierung erfolgreich:', response);
          this.errorMessage = 'Registrierung erfolgreich';
        },
        error: (err) => {
          console.log('Fehler bei der Registrierung:', err);
          this.errorMessage = 'Registrierung fehlgeschlagen.'
        }
      })

  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  navigateToMainpage(): void {
    this.router.navigate(['/']);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}