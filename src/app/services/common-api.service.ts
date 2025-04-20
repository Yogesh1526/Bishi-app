import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CommonApiService {
  private apiUrl = 'https://426d-2409-40c2-1243-5a30-1041-aa45-90bf-763e.ngrok-free.app/uam-service/'; // Base URL of your API

  // Default headers with 'ngrok-skip-browser-warning'
  private defaultHeaders = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');

  constructor(private http: HttpClient) {}

  // Common GET method
  get<T>(
    endpoint: string,
    params: HttpParams = new HttpParams(),
    headers: HttpHeaders = this.defaultHeaders // Use default headers
  ): Observable<T> {
    return this.http
      .get<T>(`${this.apiUrl}${endpoint}`, { params, headers })
      .pipe(catchError(this.handleError));
  }

  // Common POST method
  post<T>(
    endpoint: string,
    body: any,
    headers: HttpHeaders = this.defaultHeaders // Use default headers
  ): Observable<T> {
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Access-Control-Allow-Origin', '*'); // Add CORS header (optional)

    return this.http
      .post<T>(`${this.apiUrl}${endpoint}`, body, { headers })
      .pipe(catchError(this.handleError));
  }

  // Common PUT method
  put<T>(
    endpoint: string,
    body: any,
    headers: HttpHeaders = this.defaultHeaders // Use default headers
  ): Observable<T> {
    return this.http
      .put<T>(`${this.apiUrl}${endpoint}`, body, { headers })
      .pipe(catchError(this.handleError));
  }

  // Common DELETE method
  delete<T>(
    endpoint: string,
    params: HttpParams = new HttpParams(),
    headers: HttpHeaders = this.defaultHeaders // Use default headers
  ): Observable<T> {
    return this.http
      .delete<T>(`${this.apiUrl}${endpoint}`, { params, headers })
      .pipe(catchError(this.handleError));
  }

  // Error handling
  private handleError(error: any): Observable<never> {
    console.error('API error occurred:', error);
    throw error; // Optionally, you can add a user-friendly message or a logging service
  }

  // Get customers with dynamic query params and default headers
  getCustomers(endpoint: string, params: any): Observable<any> {
    const queryParams = new URLSearchParams();
    Object.keys(params).forEach((key) => {
      if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
        queryParams.append(key, params[key]);
      }
    });

    const url = `${this.apiUrl}${endpoint}?${queryParams.toString()}`;

    return this.http.get<any>(url, { headers: this.defaultHeaders }); // Use default headers
  }

  // Method to fetch group data with query parameters and default headers
  getGroups(endpoint: string): Observable<any> {
    const params = new HttpParams();
    return this.http.get<any>(`${this.apiUrl}${endpoint}`, { headers: this.defaultHeaders, params }); // Include headers here
  }

  // Get user details with pagination and default headers
  getUserDetails(endpoint: string, page: number, size: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<any>(`${this.apiUrl}${endpoint}`, { headers: this.defaultHeaders, params });
  }

  getCustomerList(endpoint: string, id:any): Observable<any> {
    const params = new HttpParams();
    return this.http.get<any>(`${this.apiUrl}${endpoint}/${id}`, { headers: this.defaultHeaders, params }); // Include headers here
  }

  updateWinnerStatus(customerId: number, groupId: string): Observable<any> {
    const url = `${this.apiUrl}customer/updateWinner`; // API endpoint
      const params = new HttpParams()
      .set('customerId', customerId.toString())
      .set('GroupId', groupId);
    return this.http.post<any>(url, null, { params }); // `null` as body since it's managed by query params
  }


  getBusinessCustomers(pageSize: number = 100, pageNumber: number = 0, sort: string = '', customerName: string = ''): Observable<any> {
    const url = `${this.apiUrl}mainBusiness/findAll?pageSize=${pageSize}&pageNumber=${pageNumber}&sort=${sort}&customerName=${customerName}`;
    return this.http.get<any>(url, { headers: this.defaultHeaders });
  }

  // Delete a Business Customer (Assuming you have a delete API for customer)
  // delete(customerId: string): Observable<any> {
  //   const url = `${this.apiUrl}customer/delete/${customerId}`;
  //   return this.http.delete<any>(url);
  // }

}
