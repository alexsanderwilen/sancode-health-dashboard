import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../shared/services/auth.service'; 
import { RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink], 
  providers: [AuthService],
  templateUrl: './registration.component.html',
  styles: ``
})
export class RegistrationComponent implements OnInit {
 
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  isSubmitted: boolean = false;

   constructor(
    public formBuilder: FormBuilder, 
    private service: AuthService, 
    private toastr: ToastrService,
    private titleService: Title) { }

    ngOnInit(): void {
      this.titleService.setTitle('Cadastrar-se no Sancode Health');
    }
 
   passwordMatchValidator: ValidatorFn = (control: AbstractControl): null => {
    const password = control.get('password')
    const confirmPassword = control.get('confirmPassword')

    if (password && confirmPassword && password.value != confirmPassword.value)
      confirmPassword?.setErrors({ passwordMismatch: true })
    else
      confirmPassword?.setErrors(null)

    return null;
   }

   passwordNull: ValidatorFn = (control: AbstractControl): null => {
    const password = control.get('password')
    
    if (password && password.value == null)
      password?.setErrors({ passwordProvided: true })
    else
      password?.setErrors(null)

    return null;
   }

   form = this.formBuilder.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(/^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[a-zA-Z0-9]).{6,}$/)]],
      confirmPassword: [''],
  }, { validators: this.passwordMatchValidator })

  onSubmit(){
    console.log(this.form.value);
    this.isSubmitted = true;
    const formValue = this.form.value;
    const payload = (({ fullName, email, password }) => ({ fullName, email, password }))(formValue);

    if (this.form.valid) {
      this.service.createUser(payload)
        .subscribe({
          next: (res: any) => {
            if (res.status = 201) {
              this.form.reset();
              this.isSubmitted = false;
              this.toastr.success('New user created!', 'Registration Successful')
            }
          },
          error: err => {
            if (err.error.errors)
              err.error.errors.forEach((x: any) => {
                switch (x.code) {
                  case "DuplicateUserName":
                    break;

                  case "DuplicateEmail":
                    this.toastr.error('Email is already taken.', 'Registration Failed')
                    break;

                  default:
                    this.toastr.error('Contact the developer', 'Registration Failed')
                    console.log(x);
                    break;
                }
              })
            else
              console.log('error:',err);
          }
        });
    }    
   }
  
   hasDisplayableError(controlName: string): Boolean {
    const control = this.form.get(controlName);
    return Boolean(control?.invalid) &&
      (this.isSubmitted || Boolean(control?.touched)|| Boolean(control?.dirty))
  }

  hasDisplayableErrorPassowrdNull(controlName: string): Boolean {
    const control = this.form.get(controlName)?.value;
    console.log(control);
    return Boolean(control == '')
  }  
}
