import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router'
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';

import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';

const routes: Routes =[
 //path 'dashboard,grafica1,progress' PagesRouting
 //path 'login,register' PagesRouting
  {path: '',redirectTo:'/dashboard',pathMatch:'full'},
  {path: '**',component:NopagefoundComponent},
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule, 
    AuthRoutingModule, 

   ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
