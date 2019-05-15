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
  private subs: Subscription = new Subscription();

  userEntries: Entry[];
  username: string;

  constructor(private entryService: EntryService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.username = this.route.snapshot.params['username'];
    this.subs.add(this.getEntriesForUser());

    const deletionSub = this.entryService.onDelete
              .subscribe((removedEntryId: string) => {
                  this.subs.add(this.getEntriesForUser());
              });

    this.subs.add(deletionSub);
  }

  getEntriesForUser(): Subscription {
    return this.entryService.getEntriesForUser(this.username)
                          .subscribe((entries: Entry[]) => {
                            console.log('fetch entries for user !');
                            this.userEntries = entries;
                          }, (err) => console.log(err));
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

}
