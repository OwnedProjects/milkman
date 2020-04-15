import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddclientComponent } from './addclient/addclient.component';
import { ViewclientComponent } from './viewclient/viewclient.component';
import { MessageComponent } from './message/message.component';
import { ProductComponent } from './product/product.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { ViewpurchasesComponent } from './viewpurchases/viewpurchases.component';
import { NeworderComponent } from './neworder/neworder.component';
import { MilkroutesComponent } from './milkroutes/milkroutes.component';
import { ViewroutedetsComponent } from './viewroutedets/viewroutedets.component';
import { DummyComponent } from './dummy/dummy.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    AddclientComponent,
    ViewclientComponent,
    MessageComponent,
    ProductComponent,
    PurchaseComponent,
    ViewpurchasesComponent,
    NeworderComponent,
    MilkroutesComponent,
    ViewroutedetsComponent,
    DummyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
