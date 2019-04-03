import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UsersService } from 'src/app/shared/services/users.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private router: Router, private usersService: UsersService) { }

  form: FormGroup;


  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email], [this.forbiddenEmails.bind(this)]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'name': new FormControl(null, [Validators.required]),
      'agree': new FormControl(false, [Validators.requiredTrue])
    });
  }

  onSubmit(){
    const {email, password, name} = this.form.value;
    const user = new User(email, password, name);
    this.usersService.createNewUser(user)
      .subscribe((user:User)=>{
        console.log(user);
        this.router.navigate(['/login'], {
            queryParams: {
              nowCanLogin: true
          }
        })
      })
  }

  forbiddenEmails(control: FormControl): Promise<any>{
    return new Promise((res, rej) => {
      this.usersService.getUserByEmail(control.value).subscribe((user: User)=>{
        if(Object.keys(user).length>0){
          res({used: true});
        }else{
          res(null);
        }
      });
    });
  }

}
