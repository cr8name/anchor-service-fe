import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AnchorService } from '../anchor/anchor.service';
import { Utilities } from '../anchor/home/utilities.interface';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-utilities',
  standalone: true,
  imports: [NgFor,CommonModule,RouterLink, RouterLinkActive,FormsModule,ReactiveFormsModule],
  templateUrl: './utilities.component.html',
  styleUrl: './utilities.component.css'
})
export class UtilitiesComponent implements OnInit {

constructor(private anchorService:AnchorService){}


utilities:Utilities[] =[];

ngOnInit(): void {
  this.anchorService.fetchAllUtilities().subscribe((utilities=>
  {
    this.utilities = utilities;
  }
  ));
}

deleteUtilities(utilitiesId: string): void{
  if(confirm('Are you sure you want to delete this utility?')){
    this.anchorService.deleteFromUtilities(utilitiesId).subscribe({
      next: () =>{
        this.utilities = this.utilities.filter(u => u.utilities_id.toString() !== utilitiesId)
        alert('Utilities deleted successfully.');
      },
    error: (err) => {
      console.error('Error deleting utility:', err);
      alert('An error occurred while deleting the utility.');
    }

    })
  }
}
updateUtilityData ={
    billing_id: 0,
    utilities_id: 0,
    customer_id: 0,
    billing_date:'',
    electric_rate:0,
    water_rate: 0,
    rent_rate: 0,
    eprev_read: 0,
    ecurr_read:0,
    wprev_read:0,
    wcurr_read:0

}
updateBillingData ={
    billing_id:0 ,
    utilities_id: 0,
    customer_id: 0,
    total_amount:0,
    rent_amount: 0,
    electric_bill: 0,
    water_bill: 0,
    billing_cycle_date:'',
}


editRow(row: Utilities) {
  row.editable = true;
}

formSubmitted: boolean = false;
saveRow(row: Utilities) {

  this.formSubmitted = true;
  // Validate fields
  if (!row.billing_date || !row.electric_rate && row.electric_rate>0 || !row.water_rate && row.water_rate>0
    || !row.water_rate && row.water_rate> 0|| !row.rent_rate  && row.rent_rate>0|| !row.eprev_read && row.eprev_read>0
    || !row.ecurr_read && row.ecurr_read>0
    || !row.wprev_read && row.wprev_read>0|| !row.wcurr_read && row.wcurr_read>0)
   {
    alert('Please fill all required fields!');
    return;
  }

  // Proceed with save logic
  //console.log('Saving row:', row);
  row.editable = false;

  this.updateUtilityData ={
    billing_id: row.billing_id,
    utilities_id:row.utilities_id ,
    customer_id:row.customer_id ,
    billing_date:row.billing_date,
    electric_rate: row.electric_rate,
    water_rate: row.water_rate,
    rent_rate: row.rent_rate,
    eprev_read: row.eprev_read,
    ecurr_read: row.ecurr_read,
    wprev_read:row.wprev_read,
    wcurr_read:row.wcurr_read
  }
  // Call your API here to save the updated row
  this.anchorService.updateUtility(row.utilities_id,this.updateUtilityData ).subscribe(
    (response)=>{
      console.log(this.updateUtilityData)
      alert('Utility Updated successfully!');
    },
    (error)=>{

      console.log('Error updating Utility', error)
      alert('Failed to update Utility, please try again')
    }

  )

  console.log('Updated row:', row);
}


cancelEdit(row: Utilities) {
  row.editable = false;
  // Reload original data from the server if necessary
}

saveBilling(row: Utilities) {

  this.formSubmitted = true;

  if (!row.billing_date || !row.electric_rate && row.electric_rate>-1 || !row.water_rate && row.water_rate>0
    || !row.water_rate && row.water_rate> 0|| !row.rent_rate  && row.rent_rate>0|| !row.eprev_read && row.eprev_read>0
    || !row.ecurr_read && row.ecurr_read>0
    || !row.wprev_read && row.wprev_read>0|| !row.wcurr_read && row.wcurr_read>0)
   {
    alert('Please fill all required fields!');
    return;
  }

  this.updateBillingData ={
    billing_id: row.billing_id ,
    utilities_id: row.utilities_id ,
    customer_id: row.customer_id,
    total_amount:(row.rent_rate+(row.ecurr_read-row.eprev_read)*row.electric_rate)+((row.wcurr_read)-row.wprev_read)*Math.abs(row.water_rate),
    rent_amount: row.rent_rate,
    electric_bill:(row.ecurr_read-row.eprev_read)*row.electric_rate ,
    water_bill: (row.wcurr_read-row.wprev_read)*row.water_rate,
    billing_cycle_date:row.billing_date

  }
  this.anchorService.updateBillingFromUtil(row.utilities_id,this.updateBillingData ).subscribe(
    (response)=>{
      console.log(this.updateBillingData)
      alert('Billing Updated successfully!');
    },
    (error)=>{
      console.log('Error updating Billing', error)
      alert('Failed to update Billing, please try again')
    }
  )
}

  utilityData = {
    customer_id: '',
    billing_date: '',
    electric_rate: null,
    water_rate: null,
    rent_rate: null,
    eprev_read: null,
    ecurr_read: null,
    wprev_read: null,
    wcurr_read: null,
  }

  onSubmit() {
    this.anchorService.saveUtilities(this.utilityData).subscribe(
      (response) => {
        console.log('Data saved successfully:', response);
        alert('Utilities updated successfully!');
      },
      (error) => {
        console.error('Error saving data:', error);
        alert('Failed to update utilities. Please try again.');
      }
    );
  }

}
