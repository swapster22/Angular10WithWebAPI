import { Component,OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FilterService } from "primeng/api";
import { SharedService } from "./shared.service";
import {FormControl} from "@angular/forms";
import{SelectItem} from 'primeng/api';

interface Designation{
  name: string,
  code: string
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  providers: [ SharedService,FilterService]
})
export class AppComponent implements OnInit {
 
  constructor(private service:SharedService,private fb:FormBuilder){}

  value1: any;
  datalist:any=[];
  cols:any=[];
  displayModal: boolean;
  displayModal1:boolean;
  // designations:Designation[];

  designations=[{name:"Programmer Analyst Trainee",value:"PAT"},{name:"Programmer Analyst",value:"PA"}];
  

  showModalDialog() {
    this.displayModal = true;
  }

  showModalDialog1(val:any) {
    this.displayModal1 = true;
    console.log(val);
    this.EmployeeDataUpdate.setValue({
      EmpId:val['EmpId'],
      EmpName:val['EmpName'],
      EmpDept:val['EmpDept'],
      Designation:val['Designation'],
      City:val['City'],
      Country:val['Country']

    });
  }
  
 EmployeeData:FormGroup;
 EmployeeDataUpdate:FormGroup;

 
  ngOnInit() {
    
    this.EmployeeData=this.fb.group({
     
      EmpName:['',Validators.required],
      EmpDept:['',Validators.required],
      Designation:['',Validators.required],
      City:['',Validators.required],
      Country:['',Validators.required]
    })

    this.EmployeeDataUpdate=this.fb.group({
      EmpId:[],
      EmpName:['',Validators.required],
      EmpDept:['',Validators.required],
      Designation:['',Validators.required],
      City:['',Validators.required],
      Country:['',Validators.required]
    })
    
  //  this.designations=[{name:'Programmer Analyst Trainee',code:'PAT'},
  //  {name:'Programmer Analyst',code:'PA'},{name:'Associate',code:'A'},{name:'Senior Associate',code:'S.A'}]

  
   this.GetEmployeeData();
 
    this.cols = [
        { field: 'EmpId', header: 'Employee Id' },
        { field: 'EmpName', header: 'Employee Name' },
        { field: 'EmpDept', header: 'Employee Department' },
        { field: 'Designation', header: 'Designation' },
        { field: 'City', header: 'City' },
        { field: 'Country', header: 'Country' },

    ];
}

GetEmployeeData(){
  this.service.getDataList().subscribe(data=>{
    this.datalist=data;
   
  });

}

Submit(){
 
  this.EmployeeData.patchValue({
    Designation:this.EmployeeData.get('Designation').value['value']
  });
 
  console.log(this.EmployeeData.value);
  this.service.addData(this.EmployeeData.value).subscribe();
  window.location.reload();
}

Update(val:any){
  console.log(val);
  this.service.updateData(val).subscribe();
  window.location.reload();
}

Delete(val:number)
{
  console.log(val);
  this.service.deleteData(val).subscribe();
  window.location.reload();
}



}
