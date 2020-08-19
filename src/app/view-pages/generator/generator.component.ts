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
  code: number;

  constructor() { }

  ngOnInit(): void {
    this.setClock();
  }

  generate(): void {
    this.allowGenerate = false;
    this.matrix = Array(10).fill('').map(() => Array(10).fill(''));
    if (this.newCharacter !== '') {
      this.buildUserMatrix();
    } else {
      this.randomizeMatrix();
    }

    this.getCharactersBySeconds();

    
    setTimeout(() => {
      this.lastCharacter = this.newCharacter !== '' ? this.newCharacter : this.lastCharacter;
      this.newCharacter = '';
      this.allowGenerate = true;
    }, 4000);
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
    console.log('CODE: ', this.code);
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
    for (let i = 0; i < 10; i++) {
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
