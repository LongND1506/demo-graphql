import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'document-explorer',
  templateUrl: './document-explorer.component.html',
  styleUrls: ['./document-explorer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentExplorerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
