import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AnchorService } from '../anchor/anchor.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { Customer } from '../anchor/home/customer.interface';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [NgFor,CommonModule,RouterLink, RouterLinkActive,FormsModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})



export class CustomerComponent implements OnInit {

  constructor(private anchorService:AnchorService){}


customer: Customer[] = [];

 getLocalDateTime(): string {
  const now = new Date();

  // Extract date components
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
  const day = now.getDate().toString().padStart(2, '0');

  // Extract time components
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');

  // Combine into the desired format
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}
 last_edited_holder = this.getLocalDateTime()



newCustomerData = {
  customer_id: '',
  first_name: '',
  last_name: '',
  address: '',
  current_status:'' ,
  date_created: '',
  last_edited:''
}

  ngOnInit(): void {
    this.anchorService.fetchAllCustomers().subscribe((Customer=>
      {
        this.customer = Customer;
      }
      ));
    }

    deleteCustomer(customerId: string): void{
      if(confirm('Are you sure you want to delete this customer?')){
        this.anchorService.deleteCustomer(customerId).subscribe({
          next: () =>{
            this.customer = this.customer.filter(c => c.customer_id.toString() !== customerId);
            alert('Customer deleted successfully.');
          },
        error: (err) => {
          console.error('Error deleting customer:', err);
          alert('An error occurred while deleting the customer.');
        }

        })
      }
    }



    updateCustomer(){
      this.newCustomerData.customer_id = "1"
      this.anchorService.addCustomer(this.newCustomerData).subscribe(
        (response) => {
          console.log('Data saved successfully:', response);
          console.log(this.newCustomerData);
          alert('Customer added successfully!');
        },
        (error) => {
          console.error('Error saving data:', error);
          alert('Failed to add Customer. Please try again.');
        }
      );
    }

    //Switch to edit the row
    editRow(row: Customer) {
      row.editable = true;
    }

    updateCustomerData ={
      customer_id:0,
      first_name:'',
      last_name:'',
      address:'',
      current_status:'',
      date_created: '',
      last_edited:'',

    }

    formSubmitted: boolean = false;
    saveRow(row: Customer) {
      if (!row.first_name || !row.last_name || !row.address || !row.current_status
        || !row.date_created || !row.last_edited)
       {
        alert('Please fill all required fields!');
        return;
       }

      // Proceed with save logic
      //console.log('Saving row:', row);
      row.editable = false;
      this.updateCustomerData ={
      customer_id:row.customer_id,
      first_name:row.first_name,
      last_name:row.last_name,
      address:row.address,
      current_status:row.current_status,
      date_created: row.date_created,
      last_edited:row.last_edited

      }
      // Call your API here to save the updated row
      this.anchorService.updateCustomer(row.customer_id,this.updateCustomerData ).subscribe(
        (response)=>{
          console.log(this.updateCustomerData)
          alert('Customer Updated successfully!');
          
        },
        (error)=>{
          console.log('Error updating customer', error)
          alert('Failed to update customer, please try again')
        }

      )
      
      console.log('Updated row:', row);
    }
    
    cancelEdit(row: Customer) {
      row.editable = false;
      // Reload original data from the server if necessary
    }

    addCustomer() {
      
      this.newCustomerData.last_edited = this.last_edited_holder
      this.anchorService.addCustomer(this.newCustomerData).subscribe(
        (response) => {
          console.log('Data saved successfully:', response);
          console.log(this.newCustomerData);
          alert('Customer added successfully!');
        },
        (error) => {
          console.error('Error saving data:', error);
          alert('Failed to add Customer. Please try again.');
        }
      );
    }
  }



 
