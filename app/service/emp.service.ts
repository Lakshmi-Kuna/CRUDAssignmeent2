import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmpDataList } from '../contract/employee';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmpService {
 constructor(private http:HttpClient) { }
  createEmp(emp:{name:string,role:string}){
    console.log(emp);
    const headers=new HttpHeaders({"myheader":'Meghasyama'})
    this.http.post<{name:string}>('http://localhost:3000/emp',emp,{headers:headers}).subscribe((res)=>{
      console.log(res);
    })
  }
  fetchEmp(){
    return this.http.get<{[key:string]:EmpDataList}>('http://localhost:3000/emp')
    .pipe(map((res)=>{
      const emp=[]
      for(const key in res){
        if(res.hasOwnProperty(key)){
        emp.push({...res[key]})
      }
      }
      return emp;
    }))
  }
  deleteEmp(id:string){
    this.http.delete('http://localhost:3000/emp/'+id).subscribe();
  }
  // deleteAll(){
  //   this.http.delete('http://localhost:3000/emp/')
  //   .subscribe();
  // }
  updateEmpData(id:string,value:EmpDataList){
    this.http.put('http://localhost:3000/emp/'+id,value).subscribe();
  }
}

