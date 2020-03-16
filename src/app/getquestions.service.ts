import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';

const apiUrl = "https://endlessquizapi.appspot.com/";
@Injectable({
  providedIn: 'root'
})
export class GetquestionsService {

  constructor(public http:HttpClient) { 
    console.log('Hello Friends');
  }

  getquestion(){
    console.log("Getting Question");
    return this.http.get(apiUrl)
  }
}
