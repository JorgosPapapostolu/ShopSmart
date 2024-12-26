import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
   constructor(private router: Router) {}
  
    navigateToLogin() {
      this.router.navigate(['/login']);
    }
  
    navigateToRegister() {
      this.router.navigate(['/register']);
    }
  
    navigateToMainpage() {
      this.router.navigate([''])
    }
}
