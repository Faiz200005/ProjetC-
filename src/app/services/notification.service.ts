import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'http://localhost:5028/api/Notifications';

  constructor(private http: HttpClient) {}

  // Récupérer les notifications d'un utilisateur
  getNotifications(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/User/${userId}`);
  }

  // Marquer comme lue
  markAsRead(id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/MarkAsRead/${id}`, {});
  }
}