import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  message = '';

  constructor(private http: HttpClient, private router: Router) { }

  login() {
    const credentials = { Email: this.email, Password: this.password };

    this.http.post<any>('http://localhost:5028/api/auth/login', credentials).subscribe({
      next: (response) => {
        const myToken = response.token || response.Token;

        if (myToken) {
          localStorage.setItem('bank_token', myToken);
          this.message = 'OK ✅ Connexion réussie';
          
          // Petit délai de sécurité pour laisser le localStorage se stabiliser
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 100);

        } else {
          this.message = '⚠️ Erreur : Token absent de la réponse.';
        }
      },
      error: (err) => {
        this.message = err.status === 401 ? '❌ Identifiants incorrects' : '❌ Serveur hors ligne';
      }
    });
  }
}