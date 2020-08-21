import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export interface MatrixInfo {
  matrix: string[][];
  code: number;
  newChar: string;
  lastChar: string;
  allowGenerate: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class GeneratorService {

  matrixInfo: MatrixInfo = {
    newChar: '',
    lastChar: undefined,
    matrix: null,
    code: null,
    allowGenerate: true
  }
  code: number;

  code$: Subject<number> = new Subject<number>();
  matrixInfo$: Subject<MatrixInfo> = new Subject<MatrixInfo>();
  autoGenerateTimer: number;
  manualTimer: number;

  constructor() { }

  updateInfo(): void {
    this.matrixInfo$.next(this.matrixInfo);
  }

  getCode(): Observable<number> {
    return this.code$.asObservable();
  }
  getMatrixInfo(): Observable<MatrixInfo> {
    return this.matrixInfo$.asObservable();
  }

  onGenerate(clicked?: boolean): void {
    
    this.matrixInfo.matrix = Array(10).fill('').map(() => Array(10).fill(''));
    
    if (this.matrixInfo.newChar !== '') {
        this.buildUserMatrix();
    } else {
      this.randomizeMatrix();
      this.matrixInfo.lastChar = this.matrixInfo.newChar;
    }
    
    this.getCharactersBySeconds();

    if (clicked && this.matrixInfo.newChar === '') {
      clearTimeout(this.manualTimer);
      clearTimeout(this.autoGenerateTimer);
    }

    if (clicked && this.matrixInfo.newChar !== '') {
      clearTimeout(this.manualTimer);
      clearTimeout(this.autoGenerateTimer);
      this.matrixInfo.allowGenerate = false;
      this.updateInfo();
      this.manualTimer = setTimeout(() => {
        this.matrixInfo.allowGenerate = true;
        this.matrixInfo.lastChar = this.matrixInfo.newChar;
        this.updateInfo();
      }, 4000);
    } 
    this.autoGenerateTimer = setTimeout(() => {
      this.onGenerate();
    }, 2000);
  }

  private buildUserMatrix() {
    const weight = 20; // 20% of 100 cells
    for (let i = 0; i < weight; i++) {
      const randomR = Math.floor(Math.random() * 10);
      const randomC = Math.floor(Math.random() * 10);
      if (this.matrixInfo.matrix[randomR][randomC] === '') {
        this.matrixInfo.matrix[randomR][randomC] = this.matrixInfo.newChar;
      }
    }
    this.randomizeMatrix();
  }

  public randomizeMatrix() {
    for (let i = 0; i < 10; i++) {
      for (let k = 0; k < 10; k++) {
        if (this.matrixInfo.matrix[i][k] === '') {
          const randomAscii = Math.floor((Math.random() * 25) + 97);
          const randomString = String.fromCharCode(randomAscii);
          this.matrixInfo.matrix[i][k] = randomString;
        }
      }
    }
  }

  public getCharactersBySeconds() {
    const seconds = new Date().getSeconds();
    let char1: string;
    let char2: string;
    if (seconds > 9) {
      const secondsString = seconds.toString();
      char1 = this.matrixInfo.matrix[+secondsString.substring(0, 1)][+secondsString.substring(1)];
      char2 = this.matrixInfo.matrix[+secondsString.substring(1)][+secondsString.substring(0, 1)];
    } else {
      char1 = this.matrixInfo.matrix[0][seconds];
      char2 = this.matrixInfo.matrix[seconds][0];
    }
    const totalChar1 = this.sumChar(char1);
    const totalChar2 = this.sumChar(char2);
    this.matrixInfo.code = (totalChar1 * 10) + totalChar2;
    this.updateInfo();

  }

  public sumChar(char: string): number {
    let sum = 0;
    this.matrixInfo.matrix.forEach(row => {
      row.forEach(col => {
        if (col === char) {
          sum += 1;
        }
      });
    });
    if (sum > 9) {
      let i = 2;
      do {
        sum = Math.ceil(sum / i);
        i += 1;
      } while (sum > 9);  
    }
    return sum;
  }
}
