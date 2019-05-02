import { Component, OnInit, Input } from '@angular/core';
import { Entry } from '../../entry.model';

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

}
