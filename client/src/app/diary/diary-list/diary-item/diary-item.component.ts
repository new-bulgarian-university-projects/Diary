import { Component, OnInit, Input } from '@angular/core';
import { Entry } from 'src/models/entry';
import {formatDate} from '@angular/common';


@Component({
  selector: 'app-diary-item',
  templateUrl: './diary-item.component.html',
  styleUrls: ['./diary-item.component.less']
})
export class DiaryItemComponent implements OnInit {
  @Input() entry: Entry;
  constructor() { }

  ngOnInit() {
  }

  getCreatedTime(): String {
    return formatDate(this.entry.createdAt, 'dd/MM/yyyy hh:mm:ss a', 'en');
  }

}
