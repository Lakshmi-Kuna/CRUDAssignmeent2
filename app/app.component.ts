import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { EmpDataList } from './contract/employee';
import { EmpService } from './service/emp.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  allEmpData:EmpDataList[]=[];
  editMode:boolean=false;
  currentEmpId:string;

 @ViewChild('empFormData') form:NgForm
  constructor(private http:HttpClient,private serv:EmpService){}

  public addEmp(emp:{name:string,role:string}){
    if(this.editMode==false){
    this.serv.createEmp(emp)
    }
  else{
  this.serv.updateEmpData(this.currentEmpId,emp);
}
  }
  ngOnInit(): void {
    this.fetchEmpdata();
  }
  OnempFetch(){
    this.fetchEmpdata();
  }

  private fetchEmpdata(){
    this.serv.fetchEmp().subscribe((emp)=>{
      this.allEmpData=emp;
    })
  }
  onDeleteClick(id:string){
   this.serv.deleteEmp(id);
  
  }
  // onDeleteAll(){
  //  this.serv.deleteAll();
  // }
  onEditClick(id:string){
    this.currentEmpId=id;

  let currentData=this.allEmpData.find((p)=>{return p.id===id})
  //  console.log(this.form);
    this.form.setValue({
      id:currentData.id,
      name:currentData.name,
      role:currentData.role
    });
    this.editMode=true;
  }
  
}