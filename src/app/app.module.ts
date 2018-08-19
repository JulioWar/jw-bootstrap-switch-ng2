import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { JwBootstrapSwitchNg2Module } from 'projects/jw-bootstrap-switch-ng2/src/public_api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    JwBootstrapSwitchNg2Module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
