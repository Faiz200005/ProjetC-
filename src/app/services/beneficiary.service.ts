import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BeneficiaryService {
  private apiUrl = 'http://localhost:5028/api/Beneficiaries';

  constructor(private http: HttpClient) {}

  // Cette méthode doit s'appeler exactement comme ça :
  getBeneficiaries(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/ByUser/${userId}`);
  }

  addBeneficiary(beneficiary: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, beneficiary);
  }

  deleteBeneficiary(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}