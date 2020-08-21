import { Component, OnInit } from '@angular/core';
import { GeneratorService, MatrixInfo } from './generator.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss']
})
export class GeneratorComponent implements OnInit {
  newCharacter: string = this.generatorService.matrixInfo.newChar;
  lastCharacter: string = this.generatorService.matrixInfo.lastChar;
  matrix: string[][] = this.generatorService.matrixInfo.matrix;
  code: number = this.generatorService.matrixInfo.code;
  allowGenerate: boolean = this.generatorService.matrixInfo.allowGenerate;
  
  clock: Date;


  destroy$: Subject<boolean> = new Subject<boolean>(); 

  constructor(private generatorService: GeneratorService) { }

  ngOnInit(): void {
    this.setClock();
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
        this.allowGenerate = info.allowGenerate;
        this.lastCharacter = info.lastChar;
      });
  }

  onGenerate(): void {
    this.matrix = Array(10).fill('').map(() => Array(10).fill(''));
    this.generatorService.matrixInfo.newChar = this.newCharacter;
    this.generatorService.matrixInfo.matrix = this.matrix;
    this.generatorService.onGenerate(true);
  }

  setClock(): void {
    this.clock = new Date();
    setTimeout(() => {
      this.setClock();
    }, 1000);
  }

  updateCharacter(event: any) {
    this.newCharacter = event.target.value.toLowerCase();
  }

  validState(): boolean {
    return this.newCharacter !== this.lastCharacter && this.allowGenerate;
  }

}
