import { Component, OnInit, OnDestroy } from '@angular/core';
import { GeneratorService, MatrixInfo } from '../generator/generator.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PaymentsService, IPayment } from './payments.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit, OnDestroy {

  code: number;
  matrix: string[][];
  paymentsList: IPayment[];

  destroy$: Subject<boolean> = new Subject<boolean>(); 
  newAmount: number;
  newName: string;
  selectedMatrix: string[][];

  constructor(
    private generatorService: GeneratorService,
    private paymentsService: PaymentsService,
    private router: Router
  ) {
    this.code = generatorService.matrixInfo.code;
    this.matrix = generatorService.matrixInfo.matrix;
    this.newName = this.paymentsService.newPayment.name;
    this.newAmount = this.paymentsService.newPayment.amount;
    this.paymentsList = this.paymentsService.paymentsList;
    if (!this.code) {
      this.router.navigate(['generator']);
    }
  }

  ngOnInit(): void {
    this.getMatrixInfo();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private getMatrixInfo() {
    this.generatorService.getMatrixInfo().pipe(takeUntil(this.destroy$)).subscribe(
      (info: MatrixInfo) => {
        this.matrix = info.matrix;
        this.code = info.code;
        this.paymentsService.newPayment.code = info.code;
        this.paymentsService.newPayment.matrix = info.matrix;
        if (!this.code) {
          this.router.navigate(['generator']);
        }
      });
  }

  updateName(event: any) {
    this.newName = event.target.value;
    this.paymentsService.newPayment.name = event.target.value;
  }

  updateAmount(event: any) {
    this.newAmount = event.target.value;
    this.paymentsService.newPayment.amount = event.target.value;
  }

  validPayment() {
    return this.newName && this.newName !== '' && this.newAmount != null && this.code;
  }

  addPayment() {
    // copy of object
    const newEntry: IPayment = JSON.parse(JSON.stringify(this.paymentsService.newPayment));
    this.paymentsList.unshift(newEntry);
    this.newAmount = null;
    this.newName = null;
    this.paymentsService.newPayment.name = null,
    this.paymentsService.newPayment.amount = null
    console.log('', this.paymentsList);
  }

  viewSelectedMatrix(matrix: string[][]) {
    this.selectedMatrix = matrix;
  }

}
