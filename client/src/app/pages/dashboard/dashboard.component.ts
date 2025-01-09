import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
    username: string = 'Test-User';

    constructor(private router: Router, private userService: UserService) {
        const userData = this.userService.getUserData();
        if (userData) {
            this.username = userData.username;
        } else {
            this.router.navigate(['/login']); // falls nicht eingeloggt hihi
        }
    }

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
        this.userService.clearUserData();
        this.router.navigate([''])
    }
}
