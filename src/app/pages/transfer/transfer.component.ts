import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; // Ajout de RouterModule pour le lien retour
import { TransactionService } from '../../services/transaction.service';
import { AccountService } from '../../services/account.service';
import { BeneficiaryService } from '../../services/beneficiary.service'; // Importation du service

@Component({
  selector: 'app-transfer',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './transfer.component.html',
  styleUrl: './transfer.component.css'
})
export class TransferComponent implements OnInit {
  myAccounts: any[] = [];
  beneficiaries: any[] = []; // Liste des favoris
  
  transferData = {
    fromAccountId: '',
    toIban: '',
    amount: 0,
    label: '',
    currency: 0, 
    type: 1,     
    status: 1    
  };

  message = '';
  isError = false;

  constructor(
    private transactionService: TransactionService,
    private accountService: AccountService,
    private beneficiaryService: BeneficiaryService, // Injection du service
    private router: Router
  ) {}

  ngOnInit(): void {
    // 1. Charger les comptes de l'utilisateur
    this.accountService.getAccounts().subscribe({
      next: (data) => {
        this.myAccounts = data;
        
        // 2. Si on a des comptes, on récupère le UserId pour charger les bénéficiaires
        if (data && data.length > 0) {
          const userId = data[0].userId || data[0].UserId;
          this.loadBeneficiaries(userId);
        }
      },
      error: (err) => console.error('Erreur comptes:', err)
    });
  }

  loadBeneficiaries(userId: string) {
    this.beneficiaryService.getBeneficiaries(userId).subscribe({
      next: (data) => this.beneficiaries = data,
      error: (err) => console.log('Aucun bénéficiaire trouvé ou erreur', err)
    });
  }

  // Fonction pour remplir l'IBAN automatiquement au clic sur un favori
  selectBeneficiary(iban: string) {
    this.transferData.toIban = iban;
  }

  onSubmit() {
    this.transactionService.makeTransfer(this.transferData).subscribe({
      next: (res) => {
        this.message = "✅ Virement effectué avec succès !";
        this.isError = false;
        setTimeout(() => this.router.navigate(['/dashboard']), 2000);
      },
      error: (err) => {
        // On récupère le message d'erreur précis du C# (ex: "IBAN introuvable")
        this.message = "❌ Erreur : " + (err.error || "Virement impossible");
        this.isError = true;
      }
    });
  }
}