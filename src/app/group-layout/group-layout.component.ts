import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonApiService } from '../services/common-api.service';

@Component({
  selector: 'app-group-layout',
  templateUrl: './group-layout.component.html',
  styleUrls: ['./group-layout.component.css']
})
export class GroupLayoutComponent implements OnInit {
  groups: any[] = [];  // Store groups fetched from the API
  dashboardCards: any[] = [];  // Cards to be displayed on the dashboard

  constructor(private groupService: CommonApiService, private router: Router) {}

  ngOnInit() {
    // Fetch groups from your API
    this.groupService.getGroups('group/getAllGroups').subscribe(
      (data) => {
        if (data && data.object && data.object.length) {
          this.groups = data.object;  // Assume the data structure based on the response
          this.createDashboardCards();  // Generate dashboard cards after fetching groups
        }
      },
      (error) => {
        console.error('Error fetching group data', error);  // Handle error
      }
    );
  }

  // Method to generate dashboard cards based on fetched groups
  createDashboardCards(): void {
    this.dashboardCards = this.groups.map(group => {
      return {
        title: group.groupName,  // Group name
        icon: 'group',  // Example icon, you can adjust based on your needs
        route: `/group/${group.gid}`,  // Navigate to specific group page based on gid
        id : group.gid
      };
    });
  }

  navigateTo(route: any): void {
    // Navigate to the group's specific route
    // this.router.navigate([route]);
    // console.log('Navigating to:', route);  // For debugging
    this.router.navigate(['/transaction-group/',route.id]);

  }
}
