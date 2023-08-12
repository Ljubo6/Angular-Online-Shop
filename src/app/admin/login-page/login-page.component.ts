import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup,Validators} from "@angular/forms";
import {AuthService} from "../../shared/auth.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy{
  form!:FormGroup
  submitted= false
  aSub!: Subscription
  constructor(
    public auth:AuthService,
    private router:Router
    ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email:new FormControl(null,[Validators.required,Validators.email]),
      password:new FormControl(null,[Validators.required,Validators.minLength(6)]),
    })
  }

  submit() {
    if (this.form.invalid){
      return
    }

    this.submitted = true

    const user = {
      email: this.form.value.email,
      password: this.form.value.password,
      returnSecureToken:true
    }
    this.aSub = this.auth.login(user).subscribe({
      next: (res) => {
        console.log(res)
        this.form.reset
        this.router.navigate(['/admin','dashboard'])
        this.submitted = false
      },
      error: err => {
        this.submitted = false
      }
    })
  }

  ngOnDestroy() {
    if (this.aSub){
      this.aSub.unsubscribe()
    }

  }
}
