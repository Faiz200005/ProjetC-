import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.css'] // On réutilise le beau CSS de la page Login !
})
export class RegisterComponent {
  fullName = '';
  email = '';
  password = '';
  message = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  register() {
    // Les propriétés doivent correspondre à ton RegisterRequest en C#
    const newUser = {
      FullName: this.fullName,
      Email: this.email,
      Password: this.password
    };

    this.http.post<any>('http://localhost:5028/api/auth/register', newUser).subscribe({
      next: (response) => {
        this.message = 'OK ✅ ' + response.message;
        
        // On redirige vers la page de login après 2 secondes pour qu'il ait le temps de lire
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        console.error('Erreur API :', err);
        if (err.status === 400) {
          this.message = '❌ ' + (err.error || 'Cet email est déjà utilisé ou les données sont invalides.');
        } else {
          this.message = '❌ Impossible de joindre le serveur';
        }
      }
    });
  }
}