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

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login() {
    this.http.get<any[]>('http://localhost:5028/api/Users').subscribe({
      next: (users) => {
        const user = users.find(u =>
          u.email === this.email &&
          u.passwordHash === this.password
        );

        if (user) {
          this.message = 'OK ✅ Connexion réussie';
          this.router.navigate(['/Welcome']);
        } else {
          this.message = '❌ Mauvais email ou mot de passe';
        }
      },
      error: (err) => {
        console.error(err);
        this.message = '❌ Erreur API';
      }
    });
  }
}
