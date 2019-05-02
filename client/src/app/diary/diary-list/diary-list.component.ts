import { Component, OnInit, OnDestroy } from '@angular/core';
import { EntryService } from '../entry.service';
import { Subscription } from 'rxjs';
import { Entry } from 'src/models/entry';

@Component({
  selector: 'app-diary-list',
  templateUrl: './diary-list.component.html',
  styleUrls: ['./diary-list.component.less']
})
export class DiaryListComponent implements OnInit, OnDestroy {
  entrySub: Subscription;
  entries: Entry[];

  constructor(private entryService: EntryService) { }

  ngOnInit() {
    this.entrySub = this.entryService.getAllEntries()
                      .subscribe((response: Entry[]) => {
                        this.entries = response;
                        console.log("response from server ", this.entries);
                      }, (err) => {console.log(err)});

  }

  ngOnDestroy() {
    this.entrySub.unsubscribe();
  }

}
