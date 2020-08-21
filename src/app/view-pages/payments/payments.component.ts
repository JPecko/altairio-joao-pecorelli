import { Component, OnInit, OnDestroy } from '@angular/core';
import { GeneratorService, MatrixInfo } from '../generator/generator.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit, OnDestroy {

  code: number;
  matrix: string[][];

  destroy$: Subject<boolean> = new Subject<boolean>(); 

  constructor(private generatorService: GeneratorService) {
    this.code = generatorService.matrixInfo.code;
    this.matrix = generatorService.matrixInfo.matrix;
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
      });
  }

}
