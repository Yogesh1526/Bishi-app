import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-hostlist',
  templateUrl: './hostlist.component.html',
  styleUrls: ['./hostlist.component.css']
})
export class HostlistComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'name', 'age', 'edit', 'delete'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  data: any[] = [
    { id: 1, name: 'John Doe', age: 25 },
    { id: 2, name: 'Jane Smith', age: 30 },
    { id: 3, name: 'Tom Johnson', age: 35 },
    { id: 4, name: 'Emily Davis', age: 28 },
    { id: 5, name: 'Michael Brown', age: 42 },
    { id: 6, name: 'Lisa Taylor', age: 33 },
    { id: 7, name: 'James Wilson', age: 29 },
    { id: 8, name: 'Patricia Harris', age: 34 },
    { id: 9, name: 'David Clark', age: 41 },
    { id: 10, name: 'Linda Lewis', age: 38 },
    { id: 11, name: 'Robert Walker', age: 46 },
    { id: 12, name: 'Mary Hall', age: 27 },
    { id: 13, name: 'Charles Allen', age: 39 },
    { id: 14, name: 'Jennifer Young', age: 32 },
    { id: 15, name: 'William King', age: 36 },
    { id: 16, name: 'Susan Wright', age: 40 },
    { id: 17, name: 'Joseph Scott', age: 31 },
    { id: 18, name: 'Sarah Adams', age: 29 },
    { id: 19, name: 'Daniel Baker', age: 45 },
    { id: 20, name: 'Jessica Green', age: 37 }
  ];

  pageSize: number = 5;

  constructor() {
    // Initialize MatTableDataSource
    this.dataSource = new MatTableDataSource(this.data);
  }

  ngOnInit() {
    // No paginator access here
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  // Apply the global search filter to all columns
  applyGlobalFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;

    // This will ensure that pagination resets when the filter is applied
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editRow(id: number) {
    console.log('Edit row with id:', id);
    // Add your edit logic here
  }

  deleteRow(id: number) {
    console.log('Delete row with id:', id);
    this.data = this.data.filter(item => item.id !== id);
    this.dataSource.data = this.data; // Rebind the data source
  }

  pageEvent(event: any) {
    console.log('Page event:', event);
    
    // Update the page size
    if (this.paginator) {
      this.paginator.pageSize = event.pageSize;
    }
    
    // Optionally, update pageIndex or other properties if needed
    console.log('Page size:', this.paginator.pageSize);
  }
}
