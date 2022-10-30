import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { RestaurantData } from '../shared/restaurent.model';

@Component({
  selector: 'app-restaurant-dash',
  templateUrl: './restaurant-dash.component.html',
  styleUrls: ['./restaurant-dash.component.css'],
})
export class RestaurantDashComponent implements OnInit {
  formValue!: FormGroup;
  formValue1!:FormGroup;
  restaurentModelObj: RestaurantData = new RestaurantData();
  allRestarantData: any;
  showAdd!:boolean;
  showbtn!:boolean;
  edit_data:any=[];
  customer_name:string="";
  data_value:any={};
  constructor(private formbuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: [''],
    });

    this.formValue1 = this.formbuilder.group({
   
      servicesa: [''],
      name_val:['']
    });
    this.getAllData();
  }
  
  clickAddResto(){
    this.formValue.reset();
    this.showAdd=true;
    this.showbtn=false;
  }
  // now subscribing our data which is mapped via services..

  addResto() {
    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.mobile = this.formValue.value.mobile;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.services = this.formValue.value.services;

    this.api.postRestaurant(this.restaurentModelObj).subscribe(
      (res) => {
        console.log(res);
        alert('Restaurent record added successfully!🙂🙂');
        //clear form fill data
        let ref = document.getElementById('clear');
        ref?.click();

        this.formValue.reset();
        this.getAllData();
      },
      (err) => {
        alert('something went wrong');
      }
    );
  }

  updateResto(){
    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.mobile = this.formValue.value.mobile;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.services = this.formValue.value.services;

    this.api.updateRestaurant(this.restaurentModelObj, this.restaurentModelObj.id).subscribe(
      (res) => {
        console.log(res);
        this.edit_data=res;
        console.log(this.edit_data);
        this.getAllData();
      
        //clear form fill data
        let ref = document.getElementById('clear');
        ref?.click();

        this.formValue.reset();
        this.getAllData();
      },
      (err) => {
        alert('something went wrong');
      }
    );
  }

  // get all data
  getAllData() {
    this.api.getRestaurant().subscribe((res) => {
      this.allRestarantData = res;
    });

  }

    
    
  deleteResto1(sss:any){
console.log(sss.id);

 
this.api.deleteRestaurant(sss.id).subscribe((res) => {
  alert('Restaurant Record Deleted');
  this.getAllData();
});
  }
  // delete records
  deleteResto(data: any) {
    
    
    this.api.deleteRestaurant(data.id).subscribe((res) => {
      alert('Restaurant Record Deleted');
      this.getAllData();
    });
  }
  onEditResto(data: any){
    this.showAdd=false;
    this.showbtn=true;
    console.log(data);

    
    this.restaurentModelObj.id    =data.id
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['services'].setValue(data.services);

  
        
    
  }


  save_info(){
    this.restaurentModelObj.name = this.edit_data.name;
    console.log(this.data_value.customer_name);
    
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.mobile = this.formValue.value.mobile;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.services = this.formValue1.value.servicesa;
    console.log(  this.restaurentModelObj.services);
    

    this.api.postRestaurant(this.restaurentModelObj).subscribe(
      (res) => {
        console.log(res);
        
        console.log( this.allRestarantData);
        
        alert('Restaurent record added successfully!🙂🙂');
        //clear form fill data
        let ref = document.getElementById('clear');
        ref?.click();

        this.formValue.reset();
        this.getAllData();
      },
      (err) => {
        alert('something went wrong');
      }
    );
  }

}



//  json-server --watch db.json
//   for running json-server to show the form data on localhost:3000;
