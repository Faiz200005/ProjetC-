import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // L'URL de ton API C# (vérifie bien le port 5028 dans ton terminal dotnet)
  private apiUrl = 'http://localhost:5028/api/auth';

  constructor(private http: HttpClient) { }

  /**
   * Méthode de connexion
   * On transforme les données pour correspondre aux Majuscules du C# (Email/Password)
   */
  login(data: { email: string; password: string }): Observable<any> {
  const loginPayload = {
    Email: data.email,
    Password: data.password
  };

  // On ajoute <any> ici pour dire à TS "ne t'inquiète pas, je sais ce qu'il y a dedans"
  return this.http.post<any>(`${this.apiUrl}/login`, loginPayload).pipe(
    tap((response: any) => { // <-- Ajoute ": any" ici aussi
      if (response && response.token) {
        this.setToken(response.token);
      }
    })
  );
}

  /**
   * Enregistre le token dans le stockage local du navigateur
   */
  private setToken(token: string): void {
    localStorage.setItem('bank_token', token);
  }

  /**
   * Récupère le token pour les autres services (Accounts, Transactions)
   */
  getToken(): string | null {
    return localStorage.getItem('bank_token');
  }

  /**
   * Déconnexion : on vide le token
   */
  logout(): void {
    localStorage.removeItem('bank_token');
    console.log('Utilisateur déconnecté.');
  }

  /**
   * Vérifie si l'utilisateur est connecté
   */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}