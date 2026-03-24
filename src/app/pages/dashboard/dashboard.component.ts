import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { TransactionService } from '../../services/transaction.service';
import { NotificationService } from '../../services/notification.service'; // <-- Import ajouté

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  accounts: any[] = [];
  transactions: any[] = [];
  notifications: any[] = []; // <-- Pour stocker les alertes
  unreadCount: number = 0;   // <-- Compteur de pastille rouge
  showNotifs: boolean = false; // <-- Toggle du menu
  isLoading = true;

  constructor(
    private accountService: AccountService,
    private transactionService: TransactionService,
    private notificationService: NotificationService, // <-- Injection
    private router: Router,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData() {
    console.log('🚀 Chargement global Fadjia Bank...');
    
    this.accountService.getAccounts().subscribe({
      next: (data) => {
        this.accounts = data;
        
        if (data && data.length > 0) {
          // On récupère l'ID du premier compte et l'ID utilisateur
          const mainAccountId = data[0].id || data[0].Id;
          const userId = data[0].userId || data[0].UserId;

          this.loadHistory(mainAccountId);
          this.loadNotifications(userId); // <-- Chargement des notifs
        }
        
        this.isLoading = false;
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('❌ Erreur :', err);
        this.isLoading = false;
        if (err.status === 401) this.logout();
        this.cdr.detectChanges();
      }
    });
  }

  loadHistory(accountId: string) {
    this.transactionService.getHistory(accountId).subscribe({
      next: (res) => {
        this.transactions = res.slice(0, 5);
        this.cdr.detectChanges(); 
      },
      error: (err) => console.error('Erreur historique :', err)
    });
  }

  // --- NOUVELLES MÉTHODES POUR LES NOTIFICATIONS ---

  loadNotifications(userId: string) {
    this.notificationService.getNotifications(userId).subscribe({
      next: (notifs) => {
        this.notifications = notifs;
        this.unreadCount = notifs.filter(n => !n.isRead).length;
        this.cdr.detectChanges();
      },
      error: (err) => console.log('Aucune notification ou erreur', err)
    });
  }

  toggleNotifs() {
    this.showNotifs = !this.showNotifs;
  }

  markRead(notif: any) {
    if (!notif.isRead) {
      this.notificationService.markAsRead(notif.id).subscribe(() => {
        notif.isRead = true;
        this.unreadCount = Math.max(0, this.unreadCount - 1);
        this.cdr.detectChanges();
      });
    }
  }

  logout() {
    localStorage.removeItem('bank_token');
    this.router.navigate(['/login']);
  }
}