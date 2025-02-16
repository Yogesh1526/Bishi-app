import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {}

  dashboardCards = [
    { title: 'User Module', icon: 'person_add', route: '/user-details' },
    { title: 'Group Registration', icon: 'group', route: '/group-details' },
    { title: 'Transaction', icon: 'paid', route: '/transactions' },
    { title: 'Balance Sheet', icon: 'account_balance', route: '/balance-sheet' },
    { title: 'About', icon: 'info', route: '/about' },
    { title: 'New Plans', icon: 'post_add', route: '/new-plans' },
    { title: 'All Winners', icon: 'emoji_events', route: '/winner' },
    { title: 'User Feedbacks', icon: 'feedback', route: '/user-feedbacks' },
    { title: 'User Details', icon: 'info', route: '/user-info-details' },


  ];

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
  
}
