import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss']
})
export class GeneratorComponent implements OnInit {
  clock: Date;
  newCharacter: string = '';
  lastCharacter: string = undefined;
  allowGenerate: boolean = true;

  matrix: string[][] = Array(10).fill('').map(() => Array(10).fill(''));
  matrixFilled = false;
  code: number;
  autoGenerateTimer: number;
  manualTimer: number;
  clicked: boolean;

  constructor() { }

  ngOnInit(): void {
    this.setClock();
  }

  generate(clicked?: boolean): void {
    this.clicked = clicked;
    
    this.matrix = Array(10).fill('').map(() => Array(10).fill(''));
    if (this.newCharacter !== '') {
        this.buildUserMatrix();
    } else {
      this.randomizeMatrix();
      this.lastCharacter = this.newCharacter;
    }

    this.getCharactersBySeconds();

    if (clicked && this.newCharacter === '') {
      clearTimeout(this.manualTimer);
      clearTimeout(this.autoGenerateTimer);
    }

    if (clicked && this.newCharacter !== '') {
      clearTimeout(this.manualTimer);
      clearTimeout(this.autoGenerateTimer);
      this.allowGenerate = false;
      this.manualTimer = setTimeout(() => {
        this.allowGenerate = true;
        this.lastCharacter = this.newCharacter;
        this.clicked = false;
      }, 4000);
    } 
    this.autoGenerateTimer = setTimeout(() => {
      this.generate();
    }, 2000);
  }

  private getCharactersBySeconds() {
    const seconds = this.clock.getSeconds();
    let char1: string;
    let char2: string;
    if (seconds > 9) {
      const secondsString = seconds.toString();
      char1 = this.matrix[+secondsString.substring(0, 1)][+secondsString.substring(1)];
      char2 = this.matrix[+secondsString.substring(1)][+secondsString.substring(0, 1)];
    } else {
      char1 = this.matrix[0][seconds];
      char2 = this.matrix[seconds][0];
    }
    const totalChar1 = this.sumChar(char1);
    const totalChar2 = this.sumChar(char2);
    this.code = (totalChar1 * 10) + totalChar2;
  }

  private sumChar(char: string): number {
    let sum = 0;
    this.matrix.forEach(row => {
      row.forEach(col => {
        if (col === char) {
          sum += 1;
        }
      });
    });
    if (sum > 9) {
      let i = 2;
      do {
        console.log(sum);
        sum = Math.ceil(sum / i);
        i += 1;
      } while (sum > 9);  
    }
    return sum;
  }

  private buildUserMatrix() {
    const weight = 20; // 20% of 100 cells
    for (let i = 0; i < weight; i++) {
      const randomR = Math.floor(Math.random() * 10);
      const randomC = Math.floor(Math.random() * 10);
      if (this.matrix[randomR][randomC] === '') {
        this.matrix[randomR][randomC] = this.newCharacter;
      }
    }
    this.randomizeMatrix();
  }

  private randomizeMatrix() {
    for (let i = 0; i < 10; i++) {
      for (let k = 0; k < 10; k++) {
        if (this.matrix[i][k] === '') {
          const randomAscii = Math.floor((Math.random() * 25) + 97);
          const randomString = String.fromCharCode(randomAscii);
          this.matrix[i][k] = randomString;
        }
      }
    }
    this.matrixFilled = true;
  }

  setClock(): void {
    this.clock = new Date();
    setTimeout(() => {
      this.setClock();
    }, 1000);
  }

  updateCharacter(event: any) {
    this.newCharacter = event.target.value;
  }

  validState(): boolean {
    return this.newCharacter !== this.lastCharacter && this.allowGenerate;
  }

}
