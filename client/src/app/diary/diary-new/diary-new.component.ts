import { Component, OnInit, OnDestroy } from '@angular/core';
import { Scope } from 'src/models/scope';
import { Tag, CheckboxTag } from 'src/models/tag';
import { EntryService } from '../entry.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-diary-new',
  templateUrl: './diary-new.component.html',
  styleUrls: ['./diary-new.component.less']
})
export class DiaryNewComponent implements OnInit, OnDestroy {
  subs: Subscription = new Subscription();

  diary: any = {};
  // should be cached
  tags: CheckboxTag[];
  scopes: Scope[];

  constructor(private entryService: EntryService,
              private authService: AuthService) { }

  ngOnInit() {
    const tagsSub = this.entryService.getAllTags()
            .subscribe((response: Tag[]) => {
                this.tags = response.map(t => new CheckboxTag(t._id, t.text));
            });

    const scopesSub = this.entryService.getAllScopes()
            .subscribe((response: Scope[]) => {
                this.scopes = response;
            });

    this.subs.add(tagsSub);
    this.subs.add(scopesSub);
  }

  onSubmit() {
    if (!this.authService.isAuthenticated()){
      return;
    }

    const userId = this.authService.getUserInfo()['id'];

    this.diary.user = userId;
    this.diary.tags = this.tags.filter(t => t.selected)
                               .map(t => t._id);

    const newEntrySub = this.entryService.createAnEntry(this.diary)
                    .subscribe((response: any) => {
                      console.log('created successfully msg: ', response)
                    }, err => console.log('error on creating a new entry, err: ', err));

    console.log(this.diary);
    this.subs.add(newEntrySub);

  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
