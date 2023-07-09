import { NgModule } from '@angular/core';
import { AGoogTransComponent } from './a-goog-trans.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    AGoogTransComponent
  ],
  imports: [
    BrowserModule,
    CommonModule
  ],
  exports: [
    AGoogTransComponent
  ],
})
export class AGoogTransModule { }