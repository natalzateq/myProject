import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { PetsComponent } from './pets/pets.component';
import { PetsDetalleComponent } from './pets-detalle/pets-detalle.component';
import { UsersComponent } from './users/users.component';


const routes: Routes = [
  //{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '', redirectTo: '/pets', pathMatch: 'full' },
  //{ path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: PetsDetalleComponent },
  { path: 'pets', component: PetsComponent },
  { path: 'createPet', component: PetsDetalleComponent },
  { path: 'users', component: UsersComponent },

];

@NgModule({
  imports: [

    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []

})



export class AppRoutingModule { }



