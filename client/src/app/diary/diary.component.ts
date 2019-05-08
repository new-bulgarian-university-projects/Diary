import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { EntryService } from './entry.service';
import { Entry } from 'src/models/entry';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.less']
})
export class DiaryComponent implements OnInit, OnDestroy {
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
