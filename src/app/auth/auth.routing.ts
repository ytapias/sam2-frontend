import { NgModule } from '@angular/core';
import { Routes,RouterModule} from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
 
const routes: Routes =[
    {path: 'login',component:LoginComponent},
    {path: 'register',component:RegisterComponent},
];
 

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
 
   ],
  exports: [ RouterModule ]
})
export class AuthRoutingModule { }
