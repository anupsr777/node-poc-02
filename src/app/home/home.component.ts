import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private jwtHelper: JwtHelperService,private auth: AuthService) { }
  userDetail:any;
  ngOnInit(): void {
        this.userDetail = this.jwtHelper.decodeToken(JSON.stringify(localStorage.getItem('access_token')));
        this.tokenValidation();
  }

  tokenValidation():void{
    if(this.jwtHelper.isTokenExpired(JSON.stringify(localStorage.getItem('access_token')))){
         this.auth.logout();
    }
  }

}
