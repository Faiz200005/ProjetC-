import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  // L'URL de base s'arrête à /api/accounts
  private apiUrl = 'http://localhost:5028/api/accounts'; 

  constructor(private http: HttpClient) { }

  // Récupère tous les comptes de l'utilisateur connecté
  getAccounts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // CORRIGÉ : L'URL finale sera bien http://localhost:5028/api/accounts/deposit/{id}
  deposit(accountId: string, amount: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/deposit/${accountId}`, amount);
  }
}