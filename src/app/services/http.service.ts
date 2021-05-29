import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(public http:HttpClient) {}


  get(url){
    return this.http.get(url);
  }

  post(url, data){
    return this.http.post(url, data);
  }
  put(url,data){
    var data1 = this.converToFormdata(data)
    return this.http.put(url,data1)
  }
  converToFormdata(data) {
    var form_data = new FormData();

    for (var key in data) {
      form_data.append(key, data[key]);
    }
    return form_data;
  }
}
