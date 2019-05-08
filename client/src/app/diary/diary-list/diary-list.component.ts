import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Entry } from 'src/models/entry';

@Component({
  selector: 'app-diary-list',
  templateUrl: './diary-list.component.html',
  styleUrls: ['./diary-list.component.less']
})
export class DiaryListComponent implements OnInit {
  @Input() entries: Entry[];
  constructor() { }

  ngOnInit() {
  }
}
