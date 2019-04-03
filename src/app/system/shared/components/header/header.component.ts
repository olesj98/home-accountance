import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  date = new Date().toLocaleDateString();
  user: User;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.refreshDate();
    this.user = JSON.parse(window.localStorage.getItem('user'))[0];
  }

  refreshDate(){
    setInterval(()=>{
      this.date = new Date().toLocaleDateString();
    }, 86400000)
  }

  onLogOut(){
    this.authService.logout();
    this. router.navigate(['/login']);
  }

}
