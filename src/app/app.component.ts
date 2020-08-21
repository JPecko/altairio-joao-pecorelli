import { Component, OnInit, OnDestroy } from '@angular/core';
import { GeneratorService, MatrixInfo } from './view-pages/generator/generator.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'altario-joao-pecorelli';

  generatorSelected = true;
  paymentsSelected = false;
  code: number;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private generatorService: GeneratorService) {
    this.code = this.generatorService.code;
  }

  ngOnInit(): void {
    this.getUpdatedCode();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    
  }

  private getUpdatedCode() {
    this.generatorService.getMatrixInfo().pipe(takeUntil(this.destroy$))
      .subscribe((data: MatrixInfo) => this.code = data.code);
  }

  onGenerator() {
    this.generatorSelected = true;
    this.paymentsSelected = false;
  }

  onPayments() {
    this.generatorSelected = false;
    this.paymentsSelected = true;
  }
}
