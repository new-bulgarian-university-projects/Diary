import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EntryService } from '../entry.service';
import { Entry } from 'src/models/entry';
import {concatMap} from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-diary-detail',
  templateUrl: './diary-detail.component.html',
  styleUrls: ['./diary-detail.component.less']
})
export class DiaryDetailComponent implements OnInit, OnDestroy {

  entry: Entry;
  canDelete = false;
  private subscription: Subscription;

  constructor(private route: ActivatedRoute,
              private entryService: EntryService,
              private authService: AuthService) { }

  ngOnInit() {
    this.subscription = this.route.params.pipe(
      concatMap(p => {
        const id = p['id'];
        console.log(id);
        return this.entryService.getEntryById(id);
      })).subscribe((entry: Entry) => {
        this.entry = entry;
        console.log(this.entry);

        if (this.authService.isAuthenticated()) {
          const userId = this.authService.getUserInfo()['id'];
          console.log('entry.id - userId', this.entry.user._id , userId)
          if (this.entry && this.entry.user._id === userId) {
            this.canDelete = true;
          }
        }
      }, (err) => console.log(err));
  }

  getCreationDate(): string {
    return this.entryService.formatDate(this.entry);
  }

  onDelete(entryId: string) {
    if (!entryId) {
      return;
    }
    console.log('will delete ', entryId);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
