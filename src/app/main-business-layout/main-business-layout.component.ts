import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { CommonApiService } from '../services/common-api.service';

@Component({
  selector: 'app-main-business-layout',
  templateUrl: './main-business-layout.component.html',
  styleUrls: ['./main-business-layout.component.css']
})
export class MainBusinessLayoutComponent implements OnInit {
  // Columns to display in the table
  displayedColumns: string[] = [
    'customerName', 'mobileNo', 'emailId', 'paymentReciveStatus', 
    'amountNeeded', 'paymentMode', 'paymentReciveDate', 'totalRepaymentAmount', 'actions'
  ];
  groupData: any[] = []; // Business customer data
  isLoading: boolean = true;
  pageIndex: number = 0;  // Track the current page index
  pageSize: number = 100; // Track the current page size

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private groupService: CommonApiService, private router: Router) { }

  ngOnInit(): void {
    this.loadBusinessCustomerData();
  }

  loadBusinessCustomerData(): void {
    this.isLoading = true;
    this.groupService.getBusinessCustomers().subscribe(
      (data) => {
        if (data && data.object) {
          // Mapping the data structure to match the table columns
          this.groupData = data.object.map((customer: any) => ({
            customerName: customer.customerName,
            mobileNo: customer.mobileNo,
            emailId: customer.emailId,
            paymentReciveStatus: customer.paymentReciveStatus,
            amountNeeded: customer.amountNeeded,
            paymentMode: customer.paymentMode,
            paymentReciveDate: customer.paymentReciveDate,
            totalRepaymentAmount: customer.totalRepaymentAmount,
            id: customer.id,
          }));
        }
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching customer data', error);  // Handle error
        this.isLoading = false;
      }
    );
  }

  // This method will be triggered when the user changes the page
  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;  // Get the current page index
    this.pageSize = event.pageSize;    // Get the page size
    this.loadBusinessCustomerData();   // Reload the data with the new page parameters
  }

  // Edit button handler (redirect to an edit page)
  onEdit(element: any): void {
    this.router.navigate(['/loanapplicant/' + element.id]);
  }

  
  // Delete button handler
  onDelete(element: any): void {
    console.log('Delete:', element);
    const confirmDelete = window.confirm('Are you sure you want to delete this business customer?');
    if (confirmDelete) {

    // Make the API call to delete the customer or group
    const customerId = element.id; // Extract customer ID from the element

    this.groupService.delete(`mainBusiness/deleteBusinessCustomer?businessCustomerId=${customerId}`).subscribe(
      (response) => {
        console.log('Customer deleted successfully:', response);
        // Optionally, reload the data or show a success message
        this.loadBusinessCustomerData();
      },
      (error) => {
        console.error('Error deleting customer:', error);
      }
    );
  }
  }

  onCreateNewGroup() {
    this.router.navigate(['/loanapplicant/0']);
  }
}
