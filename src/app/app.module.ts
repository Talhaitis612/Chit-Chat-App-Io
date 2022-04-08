import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {HttpClientModule} from '@angular/common/http'
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {StyleClassModule} from 'primeng/styleclass';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
    AppRoutingModule,
    FormsModule,
    AccordionModule,
    ButtonModule,
    InputTextModule,
    HttpClientModule,
    ConfirmPopupModule,
    StyleClassModule
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
