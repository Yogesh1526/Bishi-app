import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CommonApiService } from '../services/common-api.service';
import { Location } from '@angular/common';
import { ToastService } from '../services/toast.service';


@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {
  userForm!: FormGroup;
  groups: any[] = []; // Store fetched groups
  userId:  any; // Store ID if editing

  constructor(
    private fb: FormBuilder,
    private apiService: CommonApiService,
    private route: ActivatedRoute,
    private location: Location,
    private toastService: ToastService,
    private router: Router

  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getAllGroups();

    // Check if there is an ID in the route (edit mode)
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.userId = id;
        this.getUserById(id);
      }
    });
  }

  // Initialize form
  private initializeForm(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      whatsapp: ['', Validators.pattern('^[0-9]{10}$')],
      emailId: ['', [Validators.required, Validators.email]],
      pan: ['', [Validators.required, Validators.pattern('^[A-Z]{5}[0-9]{4}[A-Z]{1}$')]],
      aadhar: ['', [Validators.required, Validators.pattern('^[0-9]{12}$')]],
      address: ['', Validators.required],
      reference: ['', Validators.required],
      referenceContact: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      group: ['', Validators.required],
      paymentReciveDate: ['', Validators.required],
      paymentMode: ['', Validators.required],
      rePaymentDate: ['', Validators.required],
      note: [''],
      paymentAmount: ['', Validators.required],
      paymentReciveStatus: ['', Validators.required],
      winnerStatus : ['']
    });
  }

  // Fetch all groups and populate the dropdown
  getAllGroups(): void {
    this.apiService.get<any>(`group/getAllGroups`).subscribe(
      (response: any) => {
        if (response && response.object) {
          this.groups = response.object;
        }
      },
      (error) => {
        console.error('Error fetching groups:', error);
      }
    );
  }

  // Fetch user data by ID and patch form for editing
  getUserById(id: string): void {
    this.apiService.get<any>(`customer/getbyid/${id}`).subscribe(
      (response: any) => {
        if (response && response.object) {
          const userData = response.object;
          this.userForm.patchValue({
            name: userData.customerName,
            mobile: userData.mobileNo,
            emailId: userData.emailId,
            aadhar: userData.addharCardNo,
            pan: userData.panNo,
            paymentReciveDate: userData.paymentReciveDate,
            paymentMode: userData.paymentMode,
            rePaymentDate: userData.rePaymentDate,
            note: userData.note,
            paymentAmount: userData.paymentAmount,
            paymentReciveStatus: userData.paymentReciveStatus,
            group: userData.groupsDto?.length ? userData.groupsDto[0].gid : '',
            whatsapp : userData.whatsAppNumber,
            reference : userData.refrenceName,
            referenceContact : userData.refrenceMobileNumber,
            address: userData.address,
            winnerStatus : userData.winnerStatus
          });
        }
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  goBack(): void {
    this.location.back();
  }

  // Submit form (Create or Update)
  onSubmit(): void {
    if (this.userForm.invalid) {
      console.warn('Form is invalid. Please check required fields.');
      return;
    }

    const formData = this.userForm.value;

    // Construct payload
    const payload = {
      // id: this.userId || null, // If userId exists, it's an update
      customerName: formData.name,
      mobileNo: formData.mobile,
      emailId: formData.emailId,
      addharCardNo: formData.aadhar,
      panNo: formData.pan,
      paymentReciveDate: formData.paymentReciveDate,
      paymentMode: formData.paymentMode,
      rePaymentDate: formData.rePaymentDate,
      note: formData.note,
      winnerStatus: 'Participant',
      isActive: true,
      paymentAmount: formData.paymentAmount,
      paymentReciveStatus: formData.paymentReciveStatus,
      groupsDto: formData.group ? [{ gid: formData.group }] : [],
      whatsAppNumber : formData.whatsapp,
      refrenceName : formData.reference,
      refrenceMobileNumber : formData.referenceContact,
      address: formData.address
    };

    if (Number(this.userId) > 0) {
      // Update existing user
      const payload = {
        id: this.userId,
        customerName: formData.name,
        mobileNo: formData.mobile,
        emailId: formData.emailId,
        addharCardNo: formData.aadhar,
        panNo: formData.pan,
        paymentReciveDate: formData.paymentReciveDate,
        paymentMode: formData.paymentMode,
        rePaymentDate: formData.rePaymentDate,
        note: formData.note,
        winnerStatus: formData.winnerStatus,
        isActive: true,
        paymentAmount: formData.paymentAmount,
        paymentReciveStatus: formData.paymentReciveStatus,
        groupsDto: formData.group ? [{ gid: formData.group }] : [],
        whatsAppNumber : formData.whatsapp,
        refrenceName : formData.reference,
        refrenceMobileNumber : formData.referenceContact,
        address: formData.address
      };

      this.apiService.post(`customer/update`, payload).subscribe(
        (response) => {
          console.log('User updated successfully:', response);
          this.toastService.show('User updated successfully!', 'Got it', 4000);
          this.router.navigate(['/user-details']);

        },
        (error) => {
          console.error('Error updating user:', error);
          this.toastService.show('Something went wrong. Please try again!', 'Close', 4000, 'error');

        }
      );
    } else {
      // Create new user
      this.apiService.post(`customer/create`, payload).subscribe(
        (response) => {
          this.toastService.show('Customer created successfully!', 'Got it', 4000);
          console.log('Customer created successfully:', response);
          this.router.navigate(['/user-details']);

        },
        (error) => {
          this.toastService.show('Something went wrong. Please try again!', 'Close', 4000, 'error');
          console.error('Error creating customer:', error);
        }
      );
    }
  }
}
