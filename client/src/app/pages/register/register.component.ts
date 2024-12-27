import { CommonModule } from '@angular/common';
import { Component, ɵɵdeferHydrateOnViewport } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [CommonModule, FormsModule]
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string | null = null;

  constructor(private router: Router) {}

  register(): void {
    if (this.password !== this.confirmPassword) {
      console.log("Passwort stimmt nicht überein.")
      this.errorMessage = 'Die Passwörter stimmen nicht überein.';
    } else if (!this.email || !this.password || !this.confirmPassword) {
      console.log("Alle Felder ausfüllen")
      this.errorMessage = 'Bitte fülle alle Felder aus.';
    } else if (this.password === this.confirmPassword) {
      console.log('Registrierung erfolgreich:', {
        email: this.email,
        password: this.password
      });
  
      this.errorMessage = null;
  
      this.router.navigate(['/login']);
    }
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