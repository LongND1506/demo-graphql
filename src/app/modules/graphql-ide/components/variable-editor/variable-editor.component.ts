import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'variable-editor',
  templateUrl: './variable-editor.component.html',
  styleUrls: ['./variable-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VariableEditorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
