import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public username: string = "";
  public password: string = "";
  public error: string = "";
  constructor(private auth: AuthService, private router: Router) { 

  }

  ngOnInit(): void {
  }

  public submit() {
    this.auth.signUp(this.username, this.password)
      .pipe(first())
      .subscribe(
        result => { 
          console.log("result",result);
          this.router.navigate(['login']) },
        err => this.error = 'Error on Sign-up please try later'
      );
  }
}
