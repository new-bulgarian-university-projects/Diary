import { Component, OnInit, OnDestroy } from '@angular/core';
import { EntryService } from '../diary/entry.service';
import { Subscription } from 'rxjs';
import { Entry } from 'src/models/entry';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit, OnDestroy {

  userEntries: Entry[];
  username: string;
  private httpSub: Subscription;

  constructor(private entryService: EntryService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.username = this.route.snapshot.params['username'];
    console.log('user username ', this.username);
    this.httpSub = this.entryService.getEntriesForUser(this.username)
                          .subscribe((entries: Entry[]) => {
                            this.userEntries = entries;
                          }, (err) => {console.log(err)});
  }

  ngOnDestroy() {
    if (this.httpSub) {
      this.httpSub.unsubscribe();
    }
  }

}
