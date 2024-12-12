import { Routes } from '@angular/router';
import { HomeComponent } from './anchor/home/home.component';
import { CustomerComponent } from './customer/customer.component';
import { UtilitiesComponent } from './utilities/utilities.component';
import { BillingComponent } from './billing/billing.component';
import { PracComponent } from './prac/prac.component';


export const routes: Routes = [
    {path:"anchor/home", component:HomeComponent},
    {path:"anchor", redirectTo:"anchor/home", pathMatch:"full"},
    {path:"", redirectTo:"anchor/home", pathMatch:"full"},
    {path:"anchor/customer", component:CustomerComponent},
    {path:"anchor/utilities", component:UtilitiesComponent},
    {path:"anchor/billing", component:BillingComponent},
    {path:"anchor/prac", component:PracComponent}
]
