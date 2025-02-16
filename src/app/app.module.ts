import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HostlistComponent } from './hostlist/hostlist.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { CommonModule } from '@angular/common';
import { PaymentTransactionComponent } from './payment-transaction/payment-transaction.component';
import { CreateGroupComponent } from './create-group/create-group.component';
import { HttpClientModule } from '@angular/common/http';
import { UserTableComponent } from './user-table/user-table.component';
import { MainbusinessComponent } from './mainbusiness/mainbusiness.component';
import { GrpdetailsComponent } from './grpdetails/grpdetails.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AllWinnersComponent } from './all-winners/all-winners.component';
import { HeaderComponent } from './layout/header/header.component';




@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NotfoundComponent,
    DashboardComponent,
    HostlistComponent,
    UserRegistrationComponent,
    PaymentTransactionComponent,
    CreateGroupComponent,
    UserTableComponent,
    MainbusinessComponent,
    GrpdetailsComponent,
    UserdetailsComponent,
    AboutusComponent,
    AllWinnersComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,FormsModule,CommonModule,HttpClientModule,
    AppRoutingModule,ReactiveFormsModule,
    MaterialModule,BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
