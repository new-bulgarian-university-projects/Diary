import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatRadioChange } from '@angular/material';
import { Subscription } from 'rxjs';
import { EntryService } from './entry.service';
import { Entry } from 'src/models/entry';
import { CheckboxTag, Tag } from 'src/models/tag';
import { Scope } from 'src/models/scope';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.less']
})
export class DiaryComponent implements OnInit, OnDestroy {
  dataSubs: Subscription = new Subscription();

  entries: Entry[];
  tags: CheckboxTag[];
  scopes: Scope[];

  selectedScope = '';

  constructor(private entryService: EntryService) { }

  ngOnInit() {
    this.dataSubs.add(this.getEntries());
    this.dataSubs.add(this.getTags());
    this.dataSubs.add(this.getScopes());

    const onDeleteSub = this.entryService.onDelete.subscribe((removeEntry: string) => {
      this.dataSubs.add(this.getEntries());
    });

    this.dataSubs.add(onDeleteSub);
  }

  getTags(): Subscription {
    return this.entryService.getAllTags()
            .subscribe((response: Tag[]) => {
              this.tags = response.map(t => new CheckboxTag(t._id, t.text));
              console.log('tags from server ', this.tags);
            }, err => console.log(err));
  }

  getScopes(): Subscription {
    return this.entryService.getAllScopes()
            .subscribe((response: Scope[]) => {
              const allScope = new Scope();
              allScope.scope = '';
              allScope.friendlyText = 'All';
              this.scopes = response.filter(s => s.scope !== 'private');
              this.scopes.push(allScope);
              console.log('scopes from server ', this.scopes);
            }, err => console.log(err));
  }

  getEntries(): Subscription {
    return this.entryService.getAllEntries()
              .subscribe((response: Entry[]) => {
                this.entries = response;
                console.log('fetch entries for all users  ', this.entries);
              }, err => console.log(err));
  }

  radioChange(event: MatRadioChange) {
    const selectedScope = event.value;
    const httpParams = new HttpParams().append('scope', selectedScope);

    return this.entryService.getAllEntries(httpParams)
                    .subscribe((response: Entry[]) => {
                      this.entries = response;
                    });
  }

  checkboxChange() {
    let httpParams = new HttpParams();
    const selectedTags = this.tags.filter(t => t.selected);
    for (const t of selectedTags) {
        httpParams = httpParams.append('tag', t.text);
    }

    console.log('query params ', httpParams);
    return this.entryService.getAllEntries(httpParams)
            .subscribe((response: Entry[]) => {
              this.entries = response;
            });
  }

  ngOnDestroy() {
    this.dataSubs.unsubscribe();
  }
}
