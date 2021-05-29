import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiResponse } from 'src/app/interfaces/response';
import { LoginService } from 'src/app/services/login.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  logged_in_user;
  user_information;
  closeResult: string;
  registerForm: FormGroup;
  selectimg;
  firstName = new FormControl('');
  lastName = new FormControl('');
  email = new FormControl('');
  password = new FormControl('');
  submitted= false;
  data_to_send: {};
  unchange_email;

  constructor(public httpService: LoginService, public route: Router,private modalService: NgbModal,public fb:FormBuilder ) {
    this.registerForm = this.fb.group({
      firstName:['', Validators.required],
      lastName:['', Validators.required],
      email:['', [Validators.required,Validators.pattern(/^[^\s@]+@[^\s@]+$/)]],
      password:['', Validators.required],
      confimPassword:['',Validators.required],
      image :[null]
    })
   }

  ngOnInit(): void {
    this.logged_in_user=JSON.parse(localStorage.getItem('user'));
    this.httpService.checkUser(this.logged_in_user).subscribe((res: ApiResponse)=>{
      if(res.code == 400){
        this.route.navigateByUrl('/login');
      }else{
        console.log(res);

        this.user_information = res
        this.selectimg = res?.data?.img
        this.unchange_email = res?.data.email
      }
    })
  }

  logout(){
    localStorage.removeItem('user');
    this.route.navigateByUrl('');
  }
  open(content, data) {
    this.registerForm.patchValue(data)
    this.registerForm.controls.firstName.setValidators([Validators.required]);
    this.registerForm.controls.firstName.updateValueAndValidity();

    this.registerForm.controls.lastName.setValidators([Validators.required]);
    this.registerForm.controls.lastName.updateValueAndValidity();
    this.registerForm.controls.email.setValidators([Validators.required]);
    this.registerForm.controls.email.updateValueAndValidity();
    this.registerForm.controls['email'].disable();

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  imagePreview(e) {
    const file = (e.target as HTMLInputElement).files[0];

    this.registerForm.patchValue({
      image: file
    });

    this.registerForm.get('image').updateValueAndValidity()

    const reader = new FileReader();
    reader.onload = () => {
      this.selectimg = reader.result as string;
    }
    reader.readAsDataURL(file)
  }
  onregister(value){
    this.submitted=true
    if(this.registerForm.invalid){
      return
    }
    if(value.password != value.confimPassword){
      Swal.fire('Error','Password doesnt match','error');
      return;
    }
    this.data_to_send={
      'id':this.user_information.data.id,
      'firstName': value.firstName,
      'lastName': value.lastName,
      'password': value.password,
      'email': this.unchange_email,
      'image': value.image
    }
    this.httpService.updateUser(this.data_to_send).subscribe((res:ApiResponse)=>{
      if(res.code==200){
        Swal.fire('success','Updated','success')
        window.location.reload();
      }
    })
  }
}
