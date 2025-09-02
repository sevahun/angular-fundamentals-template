import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationPageComponent } from './registration-page/registration-page.component';


@NgModule({
  declarations: [
    RegistrationPageComponent
  ],
  imports: [
    CommonModule,
    RegistrationRoutingModule
  ]
})
export class RegistrationModule { }
