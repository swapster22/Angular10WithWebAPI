import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";

import { AutoCompleteModule } from "primeng/autocomplete";

import { InputTextModule } from "primeng/inputtext";
import {TableModule} from 'primeng/table';
import { SharedService } from "./shared.service";
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import {ReactiveFormsModule} from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AutoCompleteModule,
    FormsModule,
    HttpClientModule,
    TableModule,
    InputTextModule,
    DialogModule,
    ButtonModule,
    ReactiveFormsModule,
    DropdownModule
  ],
  declarations: [AppComponent],
  providers:[SharedService],
  bootstrap: [AppComponent]
})
export class AppModule {}
