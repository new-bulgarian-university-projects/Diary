import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Entry } from 'src/models/entry';
import { EntryService } from '../../entry.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-diary-item',
  templateUrl: './diary-item.component.html',
  styleUrls: ['./diary-item.component.less']
})
export class DiaryItemComponent implements OnInit, OnDestroy {
  @Input() entry: Entry;

  canDelete = false;
  subs: Subscription = new Subscription();

  constructor(private entryService: EntryService,
              private authService: AuthService) {
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      const userId = this.authService.getUserInfo()['id'];
      if (this.entry && this.entry.user._id === userId) {
        this.canDelete = true;
      }
    }
  }

  getCreatedTime(): String {
    return this.entryService.formatDate(this.entry);
  }

  onDelete(entryId: string) {
    if (!entryId) {
      return;
    }
    console.log('will delete ', entryId);

    if (confirm('Are you sure you want to delete this entry ?')){
      const httpSub = this.entryService.deleteAnEntry(this.entry)
                            .subscribe((response: any) => {
                                console.log(response, 'deleted successfully');
                            }, err => console.log(err));

      this.subs.add(httpSub);
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
