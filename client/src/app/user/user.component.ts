import { Component, OnInit, OnDestroy } from '@angular/core';
import { EntryService } from '../diary/entry.service';
import { Subscription } from 'rxjs';
import { Entry } from 'src/models/entry';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit, OnDestroy {

  userEntries: Entry[];
  private httpSub: Subscription;

  constructor(private entryService: EntryService,
              private authService: AuthService) { }

  ngOnInit() {
    if (!this.authService.isAuthenticated()){
      return;
    }
    const userId = this.authService.getToken()['id'];
    this.httpSub = this.entryService.getEntriesForUser(userId)
                          .subscribe((entries: Entry[]) => {
                            this.userEntries = entries;
                          }, (err) => {console.log(err)});
  }

  ngOnDestroy() {
    if(this.httpSub){
      this.httpSub.unsubscribe();
    }
  }

}
