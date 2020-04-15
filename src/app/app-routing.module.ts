import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AddclientComponent } from './addclient/addclient.component';
import { ViewclientComponent } from './viewclient/viewclient.component';
import { ProductComponent } from './product/product.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { ViewpurchasesComponent } from './viewpurchases/viewpurchases.component';
import { NeworderComponent } from './neworder/neworder.component';
import { MilkroutesComponent } from './milkroutes/milkroutes.component';
import { InhouseprodComponent } from './inhouseprod/inhouseprod.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'addclient/:clientid', component: AddclientComponent },
  { path: 'viewclients', component: ViewclientComponent },
  { path: 'viewpurchases', component: ViewpurchasesComponent },
  { path: 'product', component: ProductComponent },
  { path: 'purchase', component: PurchaseComponent },
  { path: 'neworder', component: NeworderComponent },
  { path: 'routes', component: MilkroutesComponent },
  { path: 'inhouseprod', component: InhouseprodComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
