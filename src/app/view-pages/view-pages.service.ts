import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewPagesService {

  lastMatrix: string[][];
  lastCode: number;

  constructor() { }
}
