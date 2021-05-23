import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiResponse } from 'src/app/interfaces/response';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor(public fb: FormBuilder, public route: Router, public register: LoginService) {
    this.registerForm = this.fb.group({
      firstName:['', Validators.required],
      lastName:['', Validators.required],
      email:['', [Validators.required,Validators.pattern(/^[^\s@]+@[^\s@]+$/)]],
      password:['', Validators.required],
      confimPassword:['',Validators.required]
    })
   }
  ngOnInit(): void {
  }


  onregister(value){
    this.submitted = true;
    if(this.registerForm.invalid){
      return
    }
    console.log(value)
    if(value.password != value.confimPassword){
      Swal.fire('Error','Password Doesnt Match','error')
      return
    }
    this.register.registerUser(value).subscribe((res: ApiResponse)=>{
      console.log(res)
      if(res.code == 200){
        localStorage.setItem('user', JSON.stringify(res.data))
        Swal.fire('Success','User has been registered','success')
      }else{
        Swal.fire('Error','Internal server error','error')
      }
    })

  }
  loginbutton(){
    this.route.navigateByUrl('login')
  }
}
