import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { HostlistComponent } from './hostlist/hostlist.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { PaymentTransactionComponent } from './payment-transaction/payment-transaction.component';
import { CreateGroupComponent } from './create-group/create-group.component';
import { UserTableComponent } from './user-table/user-table.component';
import { MainbusinessComponent } from './mainbusiness/mainbusiness.component';
import { GrpdetailsComponent } from './grpdetails/grpdetails.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AllWinnersComponent } from './all-winners/all-winners.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'hostlist',
    component: HostlistComponent
  },
  {
    path : 'user-registration/:id',
    component: UserRegistrationComponent
  },
  {
    path : 'payment-trasaction',
    component: PaymentTransactionComponent
  },
  {
    path : 'create-group/:id',
    component: CreateGroupComponent
  },
  {
    path : 'group-details',
    component: GrpdetailsComponent
  },
  {
    path : 'user-details',
    component: UserTableComponent
  },
  {
    path : 'mainbusiness',
    component: MainbusinessComponent
  },
  {
    path : 'user-info-details',
    component: UserdetailsComponent
  },
  {
    path : 'about',
    component: AboutusComponent
  },
  {
    path : 'winner',
    component: AllWinnersComponent
  },
  {
    path: '**',
    component: NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
