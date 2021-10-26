import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly APIUrl = "https://localhost:44359/api/";

  constructor(private http: HttpClient) {} 

    getDataList(): Observable < any[] > {

        return this.http.get < any > (this.APIUrl+'EmployeeData');  
    }  

    addData(val: any) {  
      return this.http.post(this.APIUrl + 'EmployeeData', val);  
    }
    
    updateData(val: any) {  
      
      return this.http.put(this.APIUrl + 'EmployeeData', val);  
    }

    deleteData(val: any) {  
      return this.http.delete(this.APIUrl + 'EmployeeData/' + val);  
    }  


}
