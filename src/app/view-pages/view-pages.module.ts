import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewPagesRoutingModule } from './view-pages-routing.module';
import { GeneratorComponent } from './generator/generator.component';
import { PaymentsComponent } from './payments/payments.component';


@NgModule({
  declarations: [GeneratorComponent, PaymentsComponent],
  imports: [
    CommonModule,
    ViewPagesRoutingModule
  ]
})
export class ViewPagesModule { }
