import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material/material.module';
import 'hammerjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { FlightComponent } from './flight-view/flight-view.component';
import { FlightAutocompleteComponent } from './flight-autocomplete/flight-autocomplete.component';
import { FlightDatepicker } from './flight-datepicker/flight-datepicker.component';
import { FlightSlider } from './flight-slider/flight-slider.component';
import {CommonService} from './common/common.service';
  
@NgModule({
  declarations: [
    AppComponent,
    FlightComponent,
    FlightAutocompleteComponent,
    FlightDatepicker,
    FlightSlider
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [CommonService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
