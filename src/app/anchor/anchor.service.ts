
/*

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Anchor } from './anchor';

@Injectable({
  providedIn: 'root'
})
export class AnchorService {

  constructor(private _httpClient:HttpClient) { }

  baseUrl: String ="/api/customer"

  fetchAllCustomers():Observable<Anchor[]>{

  */
    /*return this._httpClient.get<Anchor[]>(`${this.baseUrl}`);*/

    /*
   return this._httpClient.get<Anchor[]>('http://localhost:8080/api/customer') 
  }
}

*/



import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from './home/customer.interface';
import { Billing } from './home/billing.interface';
import { Utilities } from './home/utilities.interface';


@Injectable({
  providedIn: 'root'
})
export class AnchorService {

  constructor(private _httpClient:HttpClient) { }

  fetchAllCustomers():Observable<Customer[]>{
    /*return this._httpClient.get<Anchor[]>(`${this.baseUrl}`);*/

   return this._httpClient.get<Customer[]>('http://localhost:8080/api/customer') 
  }

  fetchAllBilling():Observable<Billing[]>{
    /*return this._httpClient.get<Anchor[]>(`${this.baseUrl}`);*/

   return this._httpClient.get<Billing[]>('http://localhost:8080/api/billing') 
  }

  fetchAllUtilities():Observable<Utilities[]>{
    /*return this._httpClient.get<Anchor[]>(`${this.baseUrl}`);*/

   return this._httpClient.get<Utilities[]>('http://localhost:8080/api/getutilall') 
  }


  fetchHomeCustomers():Observable<Customer[]>{
    /*return this._httpClient.get<Anchor[]>(`${this.baseUrl}`);*/

   return this._httpClient.get<Customer[]>('http://localhost:8080/api/customer') 
  }

  fetchHomeBilling():Observable<Billing[]>{
    /*return this._httpClient.get<Anchor[]>(`${this.baseUrl}`);*/

   return this._httpClient.get<Billing[]>('http://localhost:8080/api/dtolatestbill') 
  }

  fetchHomeUtilities():Observable<Utilities[]>{
    /*return this._httpClient.get<Anchor[]>(`${this.baseUrl}`);*/

   return this._httpClient.get<Utilities[]>('http://localhost:8080/api/getutil') 
  }

  private apiUrlupdate = 'http://localhost:8080/api/updateoneutil';

  saveUtilities(data: any): Observable<any> {
    return this._httpClient.post(this.apiUrlupdate, data);
  }

  apiUrl ='http://localhost:8080/api';

  deleteCustomer(customerId: string): Observable<void> {
    return this._httpClient.delete<void>(`${this.apiUrl}/deletecustomer/${customerId}`);
  }

  
  deleteFromUtilities(UtilitiesId:string):Observable<void>{
    return this._httpClient.delete<void>(`${this.apiUrl}/deleteutil/${UtilitiesId}`)

  }
  
  deleteFromBilling(BillingId:string):Observable<void>{
    return this._httpClient.delete<void>(`${this.apiUrl}/deletebilling/${BillingId}`)

  }

  private apiUrladdcustomer = 'http://localhost:8080/api/addcustomer';
  addCustomer(customer: any):Observable<any>{
    return this._httpClient.post(this.apiUrladdcustomer,customer);
  }

  updateCustomer(customerId: Customer["customer_id"], customer:any): Observable<any>{
    return this._httpClient.put(`${this.apiUrl}/updatecustomer/${customerId}`,customer,{ responseType: 'text' })
  }


  updateUtility(utilityId: Utilities["utilities_id"], utility:any): Observable<any>{
    return this._httpClient.put(`${this.apiUrl}/updateutility/${utilityId}`,utility,{ responseType: 'text' })
  }

  updateBillingFromUtil(billingId: Billing["billing_id"], billing:any): Observable<any>{
    return this._httpClient.put(`${this.apiUrl}/updatebillingfromutil/${billingId}`,billing,{ responseType: 'text' })
  }


}


