import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormRoutingModule } from './dynamic-form-routing.module';
import { DynamicFormPageComponent } from './container/dynamic-form-page/dynamic-form-page.component';
import { ProvinceSelectComponent } from './components/province-select/';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const COMPONENTS = [
  DynamicFormPageComponent,
  ProvinceSelectComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DynamicFormRoutingModule
  ]
})
export class DynamicFormModule { }
