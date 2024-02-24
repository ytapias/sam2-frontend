import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

// ES6 Modules or TypeScript
import Swal from 'sweetalert2'

import { FormBuilder, Validators ,ReactiveFormsModule,FormsModule, FormGroup} from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']

})

export class RegisterComponent {

    public formSubmitted = false;

    public registerForm = this.fb.group({
      nombre : ['yesdi99',[ Validators.required, Validators.minLength(3) ]],
      email : ['yesid99@hotmail.com',[ Validators.required, Validators.email ]],
      password : ['1234',[ Validators.required, Validators.minLength(3) ]],
      password2 : ['1234',[ Validators.required, Validators.minLength(3) ]],
      terminos : [true,Validators.required],
      
    },{
      Validators: this.passwordsIguales()
    });

    
    constructor( private fb: FormBuilder,
      private usuarioService: UsuarioService,
      private router: Router)
    {
    // this.registerForm.control('nombrecampo').setValue('Hoal');
    }




    campoNoValido( campo :string):boolean
    {
        if(this.registerForm.get(campo)?.invalid && this.formSubmitted)
        {
          return true;
        }
        else{
          return false;

        }
    }

    aceptaTerminos()
    {

  /*    let variable;
      if (this.registerForm.get('terminos')) {
         variable = this.registerForm.get('terminos'); // create a variable 
         variable!.valueChanges.subscribe(value => console.log(value)); // use Non-null assertion operator(used in Typescript 2)
         console.log("aqui");

         console.log(variable);

        }

console.log(variable);

*/
     //   let valor:boolean =this.registerForm.get('terminos').value || false;

       // return !(this.registerForm.get('terminos').value || false) && this.formSubmitted;
       return true;
    }

    contrasenasNoValidas()
    {
        const pass1 = this.registerForm.get('password')?.value;
        const pass2 = this.registerForm.get('password2')?.value;
        
        if ((pass1 !== pass2) && this.formSubmitted)
        {
          return true;
        }
        else{
          return false;
        }
      
    }
//7passwordName: string,password2Name: string
    passwordsIguales()
    {

      return(formGroup: FormGroup) =>{
        const pass1Control = this.registerForm.get('password');
        const pass2Control = this.registerForm.get('password2');
        
        if(pass1Control?.value === pass2Control?.value) {
          pass2Control?.setErrors(null);
        }
        else{
            pass2Control?.setErrors({noEsIgual: true});
        }

      }
    }

    crearUsuario(){
      this.formSubmitted = true;
     // console.log(this.registerForm.value);
      if ( this.registerForm.invalid)
      {
        return;
      }
      
      this.usuarioService.crear(this.registerForm.value)
                          .subscribe
                          ({
                             next: resp =>{
                              this.router.navigateByUrl('/');
                          }, error:(err) =>  {
                            Swal.fire('Error',err.error.msg,'error');
                          } 
                        } );

    }

}
