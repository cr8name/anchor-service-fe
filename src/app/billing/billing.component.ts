import { Component, OnInit } from '@angular/core';
import { AnchorService } from '../anchor/anchor.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { NgFor } from '@angular/common';
import { Billing } from '../anchor/home/billing.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [NgFor,CommonModule,RouterLink, RouterLinkActive,FormsModule],
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.css'
})
export class BillingComponent implements OnInit{

  constructor(private anchorService:AnchorService){}

  billing:Billing[] =[]

ngOnInit(): void {
  this.anchorService.fetchAllBilling().subscribe((billing=>
  {
    this.billing = billing;
  }
  ));
}

deleteFromBilling(BillingId:string): void{
  if(confirm('Are you sure you want to delete this Billing?')){
    this.anchorService.deleteFromBilling(BillingId).subscribe({
      next: ()=>{
        this.billing = this.billing.filter(b=>b.billing_id.toString() !== BillingId);
      },
      error:(err)=>{
        console.error('Error deleting billing',err);
        alert('An error occured while deleting the billing')
      }
    })
  }
}

editRow(row: Billing) {
  row.editable = true;
}

saveRow(row: Billing) {
  row.editable = false;
  // Call your API here to save the updated row
  console.log('Updated row:', row);
}

cancelEdit(row: Billing) {
  row.editable = false;
  // Reload original data from the server if necessary
}
  

}
