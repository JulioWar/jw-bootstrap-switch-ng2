import { NgModule } from '@angular/core';
import { JwBootstrapSwitchNg2Component } from './jw-bootstrap-switch-ng2.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [JwBootstrapSwitchNg2Component],
  exports: [JwBootstrapSwitchNg2Component]
})
export class JwBootstrapSwitchNg2Module { }
