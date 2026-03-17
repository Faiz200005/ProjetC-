import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-clients-banque',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ClientsBanque.components.html',
  styleUrls: ['./ClientsBanque.components.css'],
})
export class ClientsBanqueComponent {
  clientName = '';
  clientInitials = '';
  balance = '';
  savings = '';
  checking = '';
  cardNumber = '';
  expiry = '';

  transactions: {
    icon: string;
    title: string;
    date: string;
    amount: string;
    type: string;
  }[] = [];
} 
