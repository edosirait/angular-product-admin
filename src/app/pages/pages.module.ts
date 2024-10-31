import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import {PagesRoutingModule} from "./pages-routing.module";
import {TableCommonComponent} from "../shared/table-common/table-common.component";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    HomeComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    TableCommonComponent,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    FormsModule
  ]
})

export class PagesModule { }
