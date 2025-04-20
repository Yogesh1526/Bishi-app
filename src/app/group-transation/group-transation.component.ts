import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CommonApiService } from '../services/common-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { MatPaginator } from '@angular/material/paginator';  // Import paginator

export interface Customer {
  position: number;
  customerName: string;
  paymentAmount: number;
  paymentMode: string;
  aadharCardNo: string;
  panNo: string;
  paymentReciveStatus: string;
  status: 'active' | 'inactive' | 'winner';
  winnerStatus: string;  // New field for Winner status
}

@Component({
  selector: 'app-group-transation',
  templateUrl: './group-transation.component.html',
  styleUrls: ['./group-transation.component.css']
})
export class GroupTransationComponent implements OnInit {
  displayedColumns: string[] = ['position', 'customerName', 'paymentAmount', 'paymentMode', 'paymentReciveStatus', 'note','status', 'actions'];
  dataSource = new MatTableDataSource<Customer>([]); // Empty data initially
  groupId: any;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;  // ViewChild for paginator

  constructor(
    private customerService: CommonApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Check if there is an ID in the route (edit mode)
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.groupId = id;
        this.getGroupDetails(id);
      }
    });
  }

  getGroupDetails(id: string): void {
    this.customerService.getCustomerList('group/getGroupCustomerDetails', id).subscribe((response) => {
      const customerList = response.object.map((customer: { customerName: any; paymentAmount: any; paymentMode: any; aadharCardNo: any; panNo: any; paymentReciveStatus: any; isActive: any; winnerStatus: any,note:any, id:any }, index: number) => ({
        position: index + 1, // Assigning position number dynamically
        customerName: customer.customerName,
        paymentAmount: customer.paymentAmount,
        paymentMode: customer.paymentMode,
        aadharCardNo: customer.aadharCardNo,
        panNo: customer.panNo,
        paymentReciveStatus: customer.paymentReciveStatus,
        status: customer.isActive ? 'active' : 'inactive', // Set status based on isActive
        winnerStatus: customer.winnerStatus, // Add winner status field
        note : customer.note,
        id : customer.id
      }));
      this.dataSource.data = customerList; // Update the table data
      this.dataSource.paginator = this.paginator;  // Add paginator
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  toggleWinnerStatus(element: any) {
    if (element.winnerStatus !== 'Yes') {
      element.status = element.status === 'active' ? 'inactive' : 'active';
      this.customerService.updateWinnerStatus(element.id, this.groupId).subscribe({
        next: (response) => {
          element.winnerStatus = 'Yes';  
          this.dataSource._updateChangeSubscription();
        }
      });
    }
  }

   // Edit button handler
   onEdit(element: any): void {
    this.router.navigate(['/user-registration/' + element.id]);
  }

  isWinnerStatus(status: string) {
    return status === 'Yes';
  }
}
