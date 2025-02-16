import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CommonApiService } from '../services/common-api.service';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {
  displayedColumns: string[] = ['customerName', 'mobileNo', 'emailId', 'paymentAmount', 'paymentReciveStatus', 'actions'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();  // Initialize with empty data
  isLoading: boolean = true;
  totalElements: number = 0;
  pageSize: number = 5;
  pageNumber: number = 0;

  constructor(private groupService: CommonApiService) {}

  ngOnInit(): void {
    this.loadCustomerData();
  }

  loadCustomerData(): void {
    this.isLoading = true;
    this.groupService.getUserDetails('customer/findAll', this.pageNumber, this.pageSize).subscribe(
      (data) => {
        this.dataSource.data = data.object.content;
        this.totalElements = data.object.totalElements;  // Set totalElements for pagination
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching customer data', error);
        this.isLoading = false;
      }
    );
  }

  onPaginateChange(event: PageEvent): void {
    this.pageNumber = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadCustomerData();  // Reload data when page changes
  }

  // Edit button handler
  onEdit(element: any): void {
    console.log('Edit:', element);
    // Add your edit logic here
  }

  // Delete button handler
  onDelete(element: any): void {
    console.log('Delete:', element);
    // Add your delete logic here (API call or local state update)
  }
}