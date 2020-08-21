import { Injectable } from '@angular/core';

export interface IPayment {
  name: string;
  amount: number;
  matrix: string[][],
  code: number
}

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  newPayment: IPayment = {
    name: null, amount: null, matrix: null, code: null
  };

  paymentsList: IPayment[] = [];

  constructor() { }
}
