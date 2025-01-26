import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  imports: [CommonModule, FormsModule]
})
export class ShoppingListComponent {
  newListName: string = '';
  newItemName: string = '';
  shoppingLists: { id: number; name: string; items: { name: string; completed: boolean }[] }[] = [];

  constructor(private router: Router, private userService: UserService) {}

  // Einkaufsliste hinzufügen
  addShoppingList() {
    if (this.newListName.trim()) {
      this.shoppingLists.push({
        id: Date.now(),
        name: this.newListName,
        items: []
      });
      this.newListName = '';
    }
  }

  // Artikel hinzufügen wenn eine Einkaufsliste da ist (Die letzte ist immer die, die Aktiv ist:))
  addItemToList() {
    if (this.newItemName.trim()) {
      const activeList = this.shoppingLists[this.shoppingLists.length - 1]; // Letzte hinzugefügte Liste
      if (activeList) {
        activeList.items.push({ name: this.newItemName, completed: false });
        this.newItemName = ''; // Eingabe nach Hinzufügen leeren
      }
    }
  }

  // Funktion zum Abschließen der Einkaufsliste, bisher Platzhalter
  markAsCompleted(list: any) {
    alert(`Einkaufsliste "${list.name}" wurde abgeschlossen.`);
  }

  deleteList(list: any) {
    this.shoppingLists = this.shoppingLists.filter(l => l.id !== list.id);
  }

  // Navigation
  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  logout() {
    this.userService.clearUserData();
    this.router.navigate(['']);
  }
}