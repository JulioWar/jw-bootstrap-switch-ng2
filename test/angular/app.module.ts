import {NgModule}      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AppComponent}  from './AppComponent';
import {JWBootstrapSwitchModule} from "switch";

@NgModule({
  imports: [
      BrowserModule,
      JWBootstrapSwitchModule
  ],
  declarations: [
      AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
