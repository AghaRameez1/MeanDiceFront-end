import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public httpservice: HttpService) { }

  loginUser(data){
    return this.httpservice.post('/api/login',data).pipe(
      catchError(err=> of({error:true,err:err,message:'Server Error', data:[]})));
  }

  registerUser(data){
    return this.httpservice.post('/api/register',data).pipe(
      catchError(err=> of({error:true,err:err,message:'Server Error', data:[]})));
  }

  checkUser(data){
    return this.httpservice.get('/api/userfind?id='+data).pipe(
      catchError(err=> of({error:true,err:err,message:'Server Error', data:[]})));
  }
  updateUser(data){
    return this.httpservice.put('/api/updateUser',data).pipe(
      catchError(err=> of({error:true,err:err,message:'Server Error', data:[]})));
  }
}
