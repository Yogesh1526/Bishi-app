import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private snackBar: MatSnackBar) {}

 // Show a message with different styles based on the type (success, error)
 show(message: string, action: string = 'Close', duration: number = 3000, type: 'success' | 'error' = 'success'): void {
  const panelClass = type === 'success' ? 'toast-success' : 'toast-error'; // Choose the class based on type

  this.snackBar.open(message, action, {
    duration: duration,
    verticalPosition: 'top',
    horizontalPosition: 'center',
    panelClass: [panelClass]
  });
}

}
