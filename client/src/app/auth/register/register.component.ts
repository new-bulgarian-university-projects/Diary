import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { RegisterUser } from '../registerUser.model';
import { User } from '../user.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit, OnDestroy {
  user: RegisterUser;
  subs: Subscription = new Subscription();

  constructor(private authService: AuthService,
             private router: Router) { }

  ngOnInit() {
    this.user = new RegisterUser();
  }

  onSubmit() {
    console.log(this.user);
    try {
      const httpSub = this.authService.signupUser(this.user)
              .subscribe((user: User) => {
                console.log(`${user} created successfully `);
                this.router.navigate(['login']);
              }, err => console.log(err));

      this.subs.add(httpSub);
    } catch (error) {
        console.log(error);
    }
  }

  ngOnDestroy() {
    if (this.subs){
      this.subs.unsubscribe();
    }
  }
}
