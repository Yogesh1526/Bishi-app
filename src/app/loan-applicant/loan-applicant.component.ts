import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { jsPDF } from 'jspdf';  // Import jsPDF
import { CommonApiService } from '../services/common-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-loan-applicant',
  templateUrl: './loan-applicant.component.html',
  styleUrls: ['./loan-applicant.component.css']
})
export class LoanApplicantComponent implements OnInit {
  businessForm!: FormGroup;
  isEditMode: boolean = false;
  id : any;

  simpleInterest: number = 0;
  totalSimple: number = 0;
  principalAmount: number = 0;
  emiAmount: any;

  constructor(private fb: FormBuilder, private location: Location,private groupService: CommonApiService,  private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.businessForm = this.fb.group({
      customerName: ['', Validators.required],
      mobileNo: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      emailId: ['', [Validators.required, Validators.email]],
      addharCardNo: ['', Validators.required],
      panNo: ['', Validators.required],
      guarantorName: ['', Validators.required],
      guarantorMobileNumber:['', Validators.required],
      amountNeeded: ['', Validators.required],
      paymentMode: ['', Validators.required],
      paymentReceiveDate: ['', Validators.required],
      principalAmount: ['', Validators.required],
      annualRate: ['', Validators.required],
      periodUnit: ['years', Validators.required],
      periodValue: ['', Validators.required]
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.id = id;
      this.getLoanApplicantById(id);
    }

    this.calculateInterest();

    this.businessForm.valueChanges.subscribe(() => {
      this.calculateInterest();
    });
  }

  goBack(): void {
    this.location.back();
  }

  getLoanApplicantById(id: string): void {
    this.groupService.get(`mainBusiness/findById/${id}`).subscribe({
      next: (response: any) => {
        this.businessForm.patchValue({
          customerName: response.object.customerName,
          mobileNo: response.object.mobileNo,
          emailId: response.object.emailId,
          addharCardNo: response.object.addharCardNo,
          panNo: response.object.panNo,
          guarantorName: response.object.guarantorName,
          guarantorMobileNumber: response.object.guarantorMobileNumber,
          amountNeeded: response.object.amountNeeded,
          paymentMode: response.object.paymentMode,
          paymentReceiveDate: response.object.paymentReciveDate,
          principalAmount: response.object.principleAmount,
          annualRate: response.object.annualRate,
          periodUnit: response.object.periodUnit === 1 ? 'years' : 'months',
          periodValue: response.object.periodValue
        });
  
        this.calculateInterest();
      },
      error: (err) => {
        console.error('Error fetching loan applicant:', err);
        alert('Failed to load loan details.');
      }
    });
  }
  
  // onSubmit(): void {
  //   if (this.businessForm.valid) {
  //     console.log(this.businessForm.value);
  //   }
  // }

  calculateSimpleInterest(principal: number, rate: number, time: number): number {
    return (principal * rate * time) / 100;
  }

  calculateInterest(): void {
    const principal = +this.businessForm.get('principalAmount')?.value || 0;
    const rate = +this.businessForm.get('annualRate')?.value || 0;
    const period = +this.businessForm.get('periodValue')?.value || 0;
    this.simpleInterest = parseFloat(this.calculateSimpleInterest(principal, rate, period).toFixed(2));
    this.totalSimple = parseFloat((principal + this.simpleInterest).toFixed(2));
    this.principalAmount = principal;
    this.emiAmount = this.totalSimple / period;

  }

  generatePDF(): void {
    const doc = new jsPDF();
  
    // Header
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Loan Applicant Invoice", 105, 20, { align: "center" });
  
    // Subheader and Date
    doc.setFontSize(12);
    const today = new Date().toLocaleDateString();
    doc.text(`Date: ${today}`, 170, 30);
  
    // Divider line
    doc.setLineWidth(0.5);
    doc.line(10, 35, 200, 35);
  
    const formData = this.businessForm.value;
    let y = 45;
  
    const addRow = (label: string, value: string) => {
      doc.setFont("helvetica", "bold");
      doc.text(label, 10, y);
      doc.setFont("helvetica", "normal");
      doc.text(value || "-", 60, y);
      y += 8;
    };
  
    // Customer Info
    doc.setFontSize(14);
    doc.text("Customer Information", 10, y);
    y += 10;
  
    addRow("Customer Name", formData.customerName);
    addRow("Mobile No", formData.mobileNo);
    addRow("Email ID", formData.emailId);
    addRow("Aadhar Card No", formData.addharCardNo);
    addRow("PAN No", formData.panNo);
    addRow("Guarantor Name", formData.guarantorName);
  
    // Loan Info
    y += 6;
    doc.setFontSize(14);
    doc.text("Loan Details", 10, y);
    y += 10;
  
    addRow("Amount Needed", `₹${formData.amountNeeded}`);
    addRow("Payment Mode", formData.paymentMode);
    addRow("Re-Payment Date", new Date(formData.paymentReceiveDate).toLocaleDateString());
    addRow("Principal Amount", `₹${formData.principalAmount}`);
    addRow("Annual Rate", `${formData.annualRate}%`);
    addRow("Loan Period", `${formData.periodValue} ${formData.periodUnit}`);
  
    // Summary
    y += 6;
    doc.setFontSize(14);
    doc.text("Interest Summary", 10, y);
    y += 10;
  
    addRow("Simple Interest", `₹${this.simpleInterest.toFixed(2)}`);
    addRow("Total Payable Amount", `₹${this.totalSimple.toFixed(2)}`);
  
    // Signature Placeholder
    y += 20;
    doc.setFontSize(12);
    doc.text("Customer Signature:", 10, y);
    doc.line(60, y + 1, 150, y + 1); // Line for physical signature
  
    // Save
    doc.save("Loan-Applicant-Invoice.pdf");
  }

  onSubmit(): void {
    if (this.businessForm.valid) {
      const formData = this.businessForm.value;
  
      const payload: any = {
        customerName: formData.customerName,
        mobileNo: formData.mobileNo,
        emailId: formData.emailId,
        addharCardNo: formData.addharCardNo,
        panNo: formData.panNo,
        guarantorName: formData.guarantorName,
        guarantorMobileNumber: formData.guarantorMobileNumber,
        amountNeeded: formData.amountNeeded,
        intrestRate: formData.annualRate,
        paymentReciveDate: new Date().toISOString(),
        paymentMode: formData.paymentMode,
        rePaymentDate: new Date().toISOString(),
        totalRepaymentAmount: this.totalSimple,
        intrestAmountPaid: this.simpleInterest,
        principleAmount: +formData.principalAmount,
        note: "First loan cycle",
        annualRate: formData.annualRate,
        periodValue: formData.periodValue,
        periodUnit: formData.periodUnit === 'years' ? 1 : 0,
        isActive: true,
        isDeleted: false,
        createdDate: new Date().toISOString(),
        lastUpdatedDate: new Date().toISOString(),
        createdBy: "Admin",
        lastUpdatedBy: "Admin"
      };
  
      if (this.isEditMode) {
        payload.id = this.id;
      }
  
      this.groupService.post('mainBusiness/create', payload).subscribe({
        next: (response) => {
          console.log('API Success:', response);
          alert(this.isEditMode ? 'Business loan updated successfully!' : 'Business loan created successfully!');
        },
        error: (err) => {
          console.error('API Error:', err);
          alert('Failed to submit loan application.');
        }
      });
    }
  }
  
}
