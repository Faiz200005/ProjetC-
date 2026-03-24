import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { TransactionService } from '../../services/transaction.service';
import { NotificationService } from '../../services/notification.service';

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
  notifications: any[] = []; 
  unreadCount: number = 0;   
  showNotifs: boolean = false; 
  isLoading = true;

  constructor(
    private accountService: AccountService,
    private transactionService: TransactionService,
    private notificationService: NotificationService, 
    private router: Router,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData() {
    console.log('🚀 Chargement global Fadjia Bank...');
    this.isLoading = true;
    
    this.accountService.getAccounts().subscribe({
      next: (data) => {
        this.accounts = data;
        
        if (data && data.length > 0) {
          // On gère la casse (id ou Id) selon ce que renvoie ton API C#
          const mainAccountId = data[0].id || data[0].Id;
          const userId = data[0].userId || data[0].UserId;

          this.loadHistory(mainAccountId);
          this.loadNotifications(userId); 
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
        // On prend les 5 dernières transactions pour l'affichage rapide
        this.transactions = res.slice(0, 5);
        this.cdr.detectChanges(); 
      },
      error: (err) => console.error('Erreur historique :', err)
    });
  }

  // --- NOUVELLE MÉTHODE : DÉPÔT D'ARGENT ---
  showDepositPrompt() {
    const amountStr = prompt("💰 Quel montant souhaitez-vous déposer sur Fadjia Bank ?");
    const amount = parseFloat(amountStr || '0');

    if (amount > 0 && this.accounts.length > 0) {
      const accountId = this.accounts[0].id || this.accounts[0].Id;
      
      this.accountService.deposit(accountId, amount).subscribe({
        next: (res) => {
          alert(`✅ Dépôt réussi ! Votre nouveau solde est de ${res.newBalance}€`);
          // CRUCIAL : On recharge tout pour voir le nouveau solde et la nouvelle transaction
          this.loadDashboardData(); 
        },
        error: (err) => {
          console.error("Erreur lors du dépôt :", err);
          alert("❌ Impossible d'effectuer le dépôt. Vérifiez votre connexion au serveur.");
        }
      });
    } else if (amount <= 0 && amountStr !== null) {
      alert("⚠️ Le montant doit être supérieur à 0.");
    }
  }

  // --- GESTION DES NOTIFICATIONS ---
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