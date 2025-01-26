import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  private apiUrl = 'http://localhost:3000/shopping-lists';

  constructor(private http: HttpClient) {}

  createShoppingList(userId: number, name: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, { userId, name });
  }

  getShoppingLists(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${userId}`);
  }

  addItemToList(listId: number, itemName: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${listId}/add-item`, { itemName });
  }

  markItemComplete(listId: number, itemName: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${listId}/mark-item`, { itemName });
  }

  deleteShoppingList(listId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${listId}`);
  }
}