import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  public username: string = "";
  public password: string = "";
  public error: string = "";

  constructor(private auth: AuthService, private router: Router) {
    console.log("hi")
   }

   ngOnInit():void {
        if(this.auth.loggedIn){
          this.router.navigate(['home']);
        }
   }

  public submit() {
    this.auth.login(this.username, this.password)
      .pipe(first())
      .subscribe(
        result => { 
          console.log("result",result);
          this.router.navigate(['home']) },
        err => this.error = 'Could not authenticate'
      );
  }

}
