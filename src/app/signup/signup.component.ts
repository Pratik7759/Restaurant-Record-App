import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm = new FormGroup({
    name : new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z]')]),
    mobile : new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
    email : new FormControl('',[Validators.required,Validators.email]),
    password : new FormControl('',[Validators.required,Validators.minLength(8)]),
  })

  get name(){
    return this.signupForm.get('name')
  }

  get mobile(){
    return this.signupForm.get('mobile')
  }

  get email(){
    return this.signupForm.get('email')
  }

  get password(){
    return this.signupForm.get('password')
  }
  
  // signupForm!:FormGroup
  constructor(private formBuilder:FormBuilder, private _http:HttpClient , private router:Router) { }

  ngOnInit(): void {
    this.signupForm=this.formBuilder.group({
      name:[],
      mobile:[],
      email:[],
      password:[],
    })
  }
// make method to create user
signUp(){
  console.log(this.signupForm.value)
  this._http.post<any>("http://localhost:3000/signup",this.signupForm.value).subscribe(res=>{
    alert("Registration Successfully 😊");
    this.signupForm.reset();
    this.router.navigate(["login"])
  },err=>{
    alert("something went wrong 😔")
  }
  )

}



}
