import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  links = [
    {
      path: 'dashboard',
      name: 'Dashboard',
      icon: 'home'
    },
    {
      path: 'ships',
      name: 'Ships',
      icon: 'waves'
    },
    {
      path: 'tasks',
      name: 'Tasks',
      icon: 'view_list'
    },
    {
      path: 'hosts',
      name: 'Hosts',
      icon: 'group'
    },
    {
      path: 'expenses',
      name: 'Expenses',
      icon: 'monetization_on'
    }
  ];

  // Updated isOpen to be public for template binding
  public isOpen: boolean = false;

  constructor(private router: Router) {}

  // Method to toggle the menu open/close state
  toggleMenu(): void {
    this.isOpen = !this.isOpen;
  }

  // Method to handle menu close event
  closeEmitterHandler(): void {
    this.isOpen = false; // Ensure the menu closes explicitly
  }

  // Method to handle user logout
  onLogout(): void {
    this.router.navigateByUrl('/auth');
  }
}
