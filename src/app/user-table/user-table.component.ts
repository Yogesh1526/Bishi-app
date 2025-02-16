import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CommonApiService } from '../services/common-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
})
export class UserTableComponent implements OnInit {
  displayedColumns: string[] = [
    'customerName',
    'mobileNo',
    'emailId',
    'paymentMode',
    'paymentReciveStatus',
    'paymentAmount',
    'paymentReciveDate',
    'actions'
  ];
  dataSource = new MatTableDataSource<any>([]);
  filters = {
    customerName: '',
    paymentMode: '',
    paymentReciveStatus: '',
    group: ''
  };

  paymentModes: string[] = ['Cash', 'Credit Card', 'Debit Card', 'Bank Transfer', 'UPI'];
  paymentStatuses: string[] = ['Paid', 'Pending', 'Failed', 'Refunded'];
  groups: string[] = ['1000', '2000', '5000'];


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private customerService: CommonApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    const pageSize = this.paginator?.pageSize || 10;
    const pageIndex = this.paginator?.pageIndex || 0;
    const sortField = this.sort?.active || '';
    const sortDirection = this.sort?.direction || '';

    const params = {
      pageSize,
      pageNumber: pageIndex,
      sort: sortField ? `${sortField},${sortDirection}` : '',
      customerName: this.filters.customerName || '',
      paymentMode: this.filters.paymentMode || '',
      paymentReciveStatus: this.filters.paymentReciveStatus || '',
    };

    this.customerService.getCustomers('customer/findAll', params).subscribe((response) => {
      if (response?.object?.content) {
        this.dataSource.data = response.object.content;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  onSearch(): void {
    // Reset the paginator to the first page before fetching filtered data
    if (this.paginator) {
      this.paginator.pageIndex = 0;
    }
    this.loadCustomers();
  }

  onCreateUser(){
    this.router.navigate(['/user-registration/0']);
  }

   // Edit button handler
   onEdit(element: any): void {
    this.router.navigate(['/user-registration/' + element.id]);
  }

    // // Delete button handler
     onDelete(element: any): void {
    //   console.log('Delete:', element);
      
    //   // Ensure you're using the correct gid value from element
    //   const gid = element.gid; // Extract gid from the element

    //   // Make the API call to delete the group
    //   this.groupService.delete(`group/delete/${gid}/Admin`).subscribe(
    //     (response) => {
    //       console.log('Group deleted successfully:', response);
    //       // Optionally, navigate to another page or show a success message
    //     },
    //     (error) => {
    //       console.error('Error deleting group:', error);
    //     }
    //   );
    }

}
