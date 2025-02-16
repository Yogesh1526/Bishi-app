import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonApiService } from '../services/common-api.service';
import { MatPaginator } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grpdetails',
  templateUrl: './grpdetails.component.html',
  styleUrls: ['./grpdetails.component.css']
})
export class GrpdetailsComponent implements OnInit {
  displayedColumns: string[] = ['groupName', 'paymentAmount', 'status', 'actions'];
  groupData: any[] = []; // Initialize groupData as an empty array
  isLoading: boolean = true;
  pageIndex: number = 0;  // Track the current page index
  pageSize: number = 100; // Track the current page size

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private groupService: CommonApiService,private router: Router) { }

  ngOnInit(): void {
    this.loadGroupData();
  }

  loadGroupData(): void {
    this.isLoading = true;
    this.groupService.getGroups('group/getAllGroups').subscribe(
      (data) => {
        this.groupData = data.object;  // Assume the data structure based on the response
        this.isLoading = false;  // Stop loading spinner
      },
      (error) => {
        console.error('Error fetching group data', error);  // Handle error
        this.isLoading = false;
      }
    );
  }

  // This method will be triggered when the user changes the page
  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;  // Get the current page index
    this.pageSize = event.pageSize;    // Get the page size
    this.loadGroupData();              // Reload the data with the new page parameters
  }

  // Edit button handler
  onEdit(element: any): void {
    this.router.navigate(['/create-group/' + element.gid]);
  }
// Delete button handler
onDelete(element: any): void {
  console.log('Delete:', element);
  
  // Ensure you're using the correct gid value from element
  const gid = element.gid; // Extract gid from the element

  // Make the API call to delete the group
  this.groupService.delete(`group/delete/${gid}/Admin`).subscribe(
    (response) => {
      console.log('Group deleted successfully:', response);
      // Optionally, navigate to another page or show a success message
    },
    (error) => {
      console.error('Error deleting group:', error);
    }
  );
}


  onCreateNewGroup(){
    this.router.navigate(['/create-group/0']);

  }
}

