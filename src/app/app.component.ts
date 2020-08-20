import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'altario-joao-pecorelli';

  generatorSelected = true;
  paymentsSelected = false;

  onGenerator() {
    this.generatorSelected = true;
    this.paymentsSelected = false;
  }

  onPayments() {
    this.generatorSelected = false;
    this.paymentsSelected = true;
  }
}
