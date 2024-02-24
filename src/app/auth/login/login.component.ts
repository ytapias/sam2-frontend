import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router,RouterLink } from '@angular/router';

import { UsuarioService } from 'src/app/services/usuario.service';

// ES6 Modules or TypeScript
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent {

  public formSubmitted = false;

    public loginForm : FormGroup = this.fb.group({
      email : [ localStorage.getItem('email') || '',[ Validators.required ]],
      password : ['',[ Validators.required, Validators.minLength(3) ]],
      remember : true
    });


  constructor(private router:Router,
              private fb: FormBuilder,
              private usuarioService: UsuarioService){

  }

  login(){ 
  //  console.log("login");

       console.log(this.loginForm.value);

      if ( this.loginForm.invalid)
      {
        return;
      }

  //console.log(this.loginForm.value);
      this.usuarioService.login(this.loginForm.value)
                          .subscribe
                          ({
                             next: resp =>{
                             
                             if ( this.loginForm.get('remember')?.value ){ 
                                localStorage.setItem('login1', this.loginForm.get('login')?.value );

                              } else {
                                localStorage.removeItem('login1');
                              }
                              
                              // Navegar al Dashboard
                              this.router.navigateByUrl('/');
                          }, error:(err) =>  {
                            console.log("error 99");

                            console.log(err);
                            Swal.fire('Error',err.error.msg,'error');
                          } 
                        } );
        
      
    
  }

  register(){ 
    this.router.navigateByUrl('/register');
    
  }


}
