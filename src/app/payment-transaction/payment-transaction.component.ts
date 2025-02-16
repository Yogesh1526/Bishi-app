import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-payment-transaction',
  templateUrl: './payment-transaction.component.html',
  styleUrls: ['./payment-transaction.component.css']
})
export class PaymentTransactionComponent implements OnInit {
  filterForm!: FormGroup;
  displayedColumns: string[] = ['name', 'mobile', 'address', 'paymentStatus', 'mode', 'cash', 'status', 'winner'];
  
  transactions = [
    { name: 'John Doe', mobile: '1234567890', address: '123 Main St', paymentStatus: 'Completed', mode: 'Credit', cash: 1000, isActive: true, isWinner: false, date: '2024-12-10' },
    { name: 'Jane Smith', mobile: '0987654321', address: '456 Elm St', paymentStatus: 'Pending', mode: 'Debit', cash: 500, isActive: false, isWinner: true, date: '2024-12-05' },
    { name: 'Alice Brown', mobile: '1122334455', address: '789 Oak St', paymentStatus: 'Failed', mode: 'Cash', cash: 300, isActive: true, isWinner: false, date: '2024-12-07' },
    { name: 'Bob White', mobile: '6677889900', address: '123 Pine St', paymentStatus: 'Completed', mode: 'Credit', cash: 2000, isActive: true, isWinner: true, date: '2024-12-06' },
    { name: 'Charlie Green', mobile: '5566778899', address: '456 Maple St', paymentStatus: 'Completed', mode: 'Cash', cash: 1500, isActive: false, isWinner: false, date: '2024-12-08' },
    { name: 'David Grey', mobile: '9988776655', address: '321 Birch St', paymentStatus: 'Pending', mode: 'Debit', cash: 700, isActive: true, isWinner: true, date: '2024-12-09' },
    // Add more transaction data as needed
  ];

  filteredTransactions: any[] = [];
  pageSize: number = 5;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      date: [''],
      paymentStatus: [''],
      mode: [''],
      group: [''],
    });

    // Initialize with all data
    this.filteredTransactions = this.transactions;
  }

  onFilterSubmit(): void {
    const filters = this.filterForm.value;
  
    // Apply filters
    this.filteredTransactions = this.transactions.filter(transaction => {
      // Filter by date (only compare the date part, ignoring the time)
      const transactionDate = this.formatDate(transaction.date);
      const selectedDate = filters.date ? this.formatDate(filters.date) : '';
  
      return (
        // Check if the date matches or if no date filter is applied
        (selectedDate ? transactionDate === selectedDate : true) &&
        
        // Filter by payment status (if selected)
        (filters.paymentStatus ? transaction.paymentStatus === filters.paymentStatus : true) &&
        
        // Filter by mode (if selected)
        (filters.mode ? transaction.mode === filters.mode : true) &&
        
        // Filter by group (if selected)
        (filters.group ? transaction.cash === +filters.group : true)
      );
    });
  
    // Reset to the first page after filter
    this.paginator.pageIndex = 0;
    this.onPageChange({ pageIndex: 0, pageSize: this.pageSize });
  }
  
  // Utility function to format dates to 'YYYY-MM-DD' format
  formatDate(date: any): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0]; // Extract date part (YYYY-MM-DD)
  }
  

  onPageChange(event: any): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.filteredTransactions = this.transactions.slice(startIndex, endIndex);
  }
}
