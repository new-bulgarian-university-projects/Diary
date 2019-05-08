import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EntryService } from '../entry.service';
import { Entry } from 'src/models/entry';
import {concatMap} from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-diary-detail',
  templateUrl: './diary-detail.component.html',
  styleUrls: ['./diary-detail.component.less']
})
export class DiaryDetailComponent implements OnInit, OnDestroy {

  entry: Entry;
  private subscription: Subscription;

  constructor(private route: ActivatedRoute,
              private entryService: EntryService) { }

  ngOnInit() {
    this.subscription = this.route.params.pipe(
      concatMap(p => {
        const id = p['id'];
        console.log(id);
        return this.entryService.getEntryById(id);
      })).subscribe((entry: Entry) => {
        this.entry = entry;
        console.log(this.entry);
      }, (err) => console.log(err));
  }

  getCreationDate(): string {
    return this.entryService.formatDate(this.entry);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
