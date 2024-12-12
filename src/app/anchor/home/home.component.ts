
/*


import { Component, OnInit } from '@angular/core';

import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {Anchor} from '../anchor';

import { AnchorService } from '../anchor.service';

*/
/*
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit{

  displayedColumns = ['customer_id', 'first_name', 'last_name','address','current_status','date_created','last_edited'];
    
  dataSource = new MatTableDataSource<Anchor>();
  constructor(private anchorService:AnchorService){}

  anchor:Anchor[]=[];

  ngOnInit(): void {
    
    this.anchorService.fetchAllCustomers().subscribe(data=>
    {
      this.anchor=data;
      this.dataSource = new MatTableDataSource<Anchor>(data);
    }
    ) 

    }

  }

  */
import { Component, OnInit } from '@angular/core';
import { AnchorService } from '../anchor.service';
import { Customer } from './customer.interface';
import { NgFor } from '@angular/common';
import { Billing } from './billing.interface';
import { Utilities } from './utilities.interface';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



  @Component({
    selector: 'app-home',
    standalone: true,
    imports: [NgFor,RouterOutlet,CommonModule,RouterLink, RouterLinkActive,FormsModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
  })
  
  export class HomeComponent implements OnInit{

    constructor(private anchorService:AnchorService){}
    

    customers:Customer[]=[];
    billing: Billing[]=[];
    utilities: Utilities[]=[];

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
  
    ngOnInit(): void {
      this.anchorService.fetchHomeCustomers().subscribe((customers=>
      {
        this.customers = customers;
      }
      ));

      this.anchorService.fetchHomeBilling().subscribe((billing=>
        {
          this.billing = billing;
        }
        ));

      this.anchorService.fetchHomeUtilities().subscribe((utilities=>
        {
          this.utilities = utilities;
        }
        ));
    
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
  
    
