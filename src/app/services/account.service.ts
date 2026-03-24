import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = 'http://localhost:5028/api/accounts'; // Ton URL C#

  constructor(private http: HttpClient) { }

  // Récupère tous les comptes de l'utilisateur connecté
  getAccounts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}