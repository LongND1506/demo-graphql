import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'query-result',
  templateUrl: './query-result.component.html',
  styleUrls: ['./query-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QueryResultComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
