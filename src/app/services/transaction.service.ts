import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'http://localhost:5028/api/Transactions';

  constructor(private http: HttpClient) {}

  // Effectuer un nouveau virement
  makeTransfer(transaction: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, transaction);
  }

  // Récupérer l'historique d'un compte précis
  getHistory(accountId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/History/${accountId}`);
  }
}