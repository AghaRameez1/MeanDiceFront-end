import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiResponse } from 'src/app/interfaces/response';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  logged_in_user;

  constructor(public httpService: LoginService, public route: Router) { }

  ngOnInit(): void {
    this.logged_in_user=JSON.parse(localStorage.getItem('user'));
    this.httpService.checkUser(this.logged_in_user).subscribe((res: ApiResponse)=>{
      if(res.code == 400){
        this.route.navigateByUrl('/login');
      }
    })
  }

  logout(){

  }
}
