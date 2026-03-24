import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // 1. AJOUTE ÇA ICI
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BeneficiaryService } from '../../services/beneficiary.service';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-beneficiary-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './beneficiary-management.component.html',
  styleUrl: './beneficiary-management.component.css'
})
export class BeneficiaryManagementComponent implements OnInit {
  beneficiaries: any[] = [];
  userId: string = '';
  
  newBeneficiary = {
    name: '',
    iban: '',
    userId: ''
  };

  message = '';
  isError = false;

  constructor(
    private beneficiaryService: BeneficiaryService,
    private accountService: AccountService,
    private cdr: ChangeDetectorRef // 2. AJOUTE ÇA ICI
  ) {}

  ngOnInit(): void {
    this.accountService.getAccounts().subscribe(data => {
      if (data && data.length > 0) {
        this.userId = data[0].userId || data[0].UserId;
        this.loadBeneficiaries();
      }
    });
  }

  loadBeneficiaries() {
    // Vérifie bien que le nom de la méthode est getBeneficiaries
    this.beneficiaryService.getBeneficiaries(this.userId).subscribe({
      next: (data) => {
        this.beneficiaries = data;
        this.cdr.detectChanges(); // Maintenant, 'cdr' existe !
      },
      error: (err) => {
        console.log('Erreur ou aucun bénéficiaire', err);
        this.beneficiaries = [];
        this.cdr.detectChanges();
      }
    });
  }

  onAdd() {
    this.newBeneficiary.userId = this.userId;
    this.beneficiaryService.addBeneficiary(this.newBeneficiary).subscribe({
      next: () => {
        this.message = "✅ Bénéficiaire ajouté !";
        this.isError = false;
        this.newBeneficiary = { name: '', iban: '', userId: this.userId };
        this.loadBeneficiaries();
      },
      error: (err) => {
        this.message = "❌ " + (err.error || "Erreur lors de l'ajout");
        this.isError = true;
        this.cdr.detectChanges();
      }
    });
  }

  onDelete(id: string) {
    if(confirm("Supprimer ce bénéficiaire ?")) {
      this.beneficiaryService.deleteBeneficiary(id).subscribe({
        next: () => {
          this.loadBeneficiaries();
        },
        error: (err) => console.error(err)
      });
    }
  }
}