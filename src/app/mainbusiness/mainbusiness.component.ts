import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-mainbusiness',
  templateUrl: './mainbusiness.component.html',
  styleUrls: ['./mainbusiness.component.css']
})
export class MainbusinessComponent {

  userForm: FormGroup;

  paymentModes: string[] = ['Online', 'Cash', 'Cheque', 'Bank Transfer', 'UPI'];
  paymentStatuses: string[] = ['pending', 'paid', 'failed', 'refunded'];

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      customerName: ['', Validators.required],
      mobileNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      emailId: ['', [Validators.required, Validators.email]],
      addharCardNo: ['', Validators.required],
      panNo: ['', Validators.required],
      guarantorName: ['', Validators.required],
      guarantorMobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      amountNeeded: ['', Validators.required],
      intrestRate: ['', Validators.required],
      paymentReciveDate: ['', Validators.required],
      paymentMode: ['', Validators.required],
      rePaymentDate: ['', Validators.required],
      totalRepaymentAmount: ['', Validators.required],
      intrestAmountPaid: ['', Validators.required],
      paymentReciveStatus: ['', Validators.required],
      note: ['']
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log('Form Submitted:', this.userForm.value);
    }
  }
  
}
