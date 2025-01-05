import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
    username: string = 'Test-User';

    constructor(private router: Router) { }

    navigateToDashboard() {
        this.router.navigate(['/dashboard']);
    }

    navigateToProfile() {
        this.router.navigate(['/profile']);
    }

    navigateToTasks() {
        this.router.navigate(['/tasks']);
    }

    navigateToAnalytics() {
        this.router.navigate(['/analytics']);
    }

    navigateToSettings() {
        this.router.navigate(['/settings']);
    }

    logout() {
        this.router.navigate([''])
    }
}
