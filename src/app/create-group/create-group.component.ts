import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CommonApiService } from '../services/common-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css'],
})
export class CreateGroupComponent implements OnInit {
  groupForm: FormGroup;
  isEditMode: boolean = false;
  groupId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private apiService: CommonApiService,
    private route: ActivatedRoute,
    private location: Location,
    private toastService: ToastService,
    private router: Router
  ) {
    this.groupForm = this.fb.group({
      groupName: ['', [Validators.required, Validators.maxLength(50)]],
      groupAmount: [0, [Validators.required, Validators.min(0)]],
      paymentAmount: [0, [Validators.required, Validators.min(0)]],
      status: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.groupId = this.route.snapshot.paramMap.get('id');

    if (this.groupId) {
      this.isEditMode = true;
      this.loadGroupData(this.groupId);
    } else {
      this.addCustomer(); // Add at least one customer by default if it's in create mode
    }
  }

  get customerDto(): FormArray {
    return this.groupForm.get('customerDto') as FormArray;
  }

  addCustomer(): void {
    const customerGroup = this.fb.group({
      id: [null, [Validators.required]],
    });
    this.customerDto.push(customerGroup);
  }

  removeCustomer(index: number): void {
    this.customerDto.removeAt(index);
  }

  loadGroupData(groupId: string): void {
    this.apiService.get(`group/getbygid/${groupId}`).subscribe((data: any) => {
      // Assume that data is in the format that matches the form controls
      this.groupForm.patchValue({
        groupName: data.object.groupName,
        groupAmount: data.object.groupAmount,
        paymentAmount: data.object.paymentAmount,
        status: data.object.status,
      });

      // You may also want to load customer data if it's part of the form
      this.addCustomer(); // Assuming you need to add customer data as well
    });
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit(): void {
    if (this.groupForm.valid) {
      const formValue = this.groupForm.value;

      if (this.isEditMode && Number(this.groupId) > 0) {
        const payload = {
          gid: Number(this.groupId) != null ? Number(this.groupId) : null,
          groupName: formValue.groupName,
          groupAmount: formValue.groupAmount,
          paymentAmount: formValue.paymentAmount,
          status: formValue.status,
        };
        // If it's in edit mode, call the update API
        this.apiService.post(`group/update`, payload).subscribe(
          (response) => {
            console.log('Group updated successfully:', response);
            this.toastService.show('Group updated successfully!', 'Got it', 4000);
            this.router.navigate(['/group-details']);
            // Optionally, navigate to another page or show a success message
          },
          (error) => {
            this.toastService.show('Something went wrong. Please try again!', 'Close', 4000, 'error');
            console.error('Error updating group:', error);
          }
        );
      } else {
        const payload = {
          groupName: formValue.groupName,
          groupAmount: formValue.groupAmount,
          paymentAmount: formValue.paymentAmount,
          status: formValue.status,
        };
        // If it's in create mode, call the create API
        this.apiService.post('group/create', payload).subscribe(
          (response) => {
            console.log('Group created successfully:', response);
            this.toastService.show('Group created successfully!', 'Got it', 4000);
            this.router.navigate(['/group-details']);
            // Optionally, navigate to another page or show a success message
          },
          (error) => {
            this.toastService.show('Something went wrong. Please try again!', 'Close', 4000, 'error');
            console.error('Error creating group:', error);
          }
        );
      }
    } else {
      console.log('Form Invalid');
    }
  }
}
