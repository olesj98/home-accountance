import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UsersService } from 'src/app/shared/services/users.service';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { fadeStateTrigger } from 'src/app/shared/animations/fade.animation';
import { Title } from '@angular/platform-browser';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [fadeStateTrigger]
})
export class LoginComponent implements OnInit {

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
    private rout: ActivatedRoute,
    private title: Title
  ) {
    title.setTitle('Entrance to the system');
  }

  form: FormGroup;
  message = {};

  ngOnInit() {
    this.message = {type: 'danger', text: ''};

    this.rout.queryParams.subscribe((params: Params)=>{
      if(params.nowCanLogin){
        this.showMessage('success', 'Now you can log in');
      }
      else if(params.accessDenied){
        this.showMessage('warning', 'You should be logged in to work');
      }
    });

    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  showMessage(type:string, text:string,){
    this.message = {type, text};
    window.setTimeout(()=>{this.message = {type: 'danger', text: ''}}, 3000)
  }

  onSubmit(){
    const formGroup = this.form.value;

    this.usersService.getUserByEmail(this.form.controls.email.value)
    .subscribe((user:User)=>{
      if(Object.keys(user).length > 0){
        if(user[0].password === formGroup.password){
          this.message = {type: 'danger', text: ''};
          window.localStorage.setItem('user', JSON.stringify(user));
          this.authService.login();
          this.router.navigate(['/system', 'bill']);
        } else {
          this.showMessage('danger', 'Wrong password',);
        }
      } else{
        this.showMessage('danger','No such user. Sign up');
      }
    });
  }

}
