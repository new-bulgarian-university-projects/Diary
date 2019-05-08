import { Component, OnInit, Input } from '@angular/core';
import { Entry } from 'src/models/entry';
import { EntryService } from '../../entry.service';


@Component({
  selector: 'app-diary-item',
  templateUrl: './diary-item.component.html',
  styleUrls: ['./diary-item.component.less']
})
export class DiaryItemComponent implements OnInit {
  @Input() entry: Entry;
  constructor(private entryService: EntryService) { }

  ngOnInit() {
  }

  getCreatedTime(): String {
    return this.entryService.formatDate(this.entry);
  }
}
