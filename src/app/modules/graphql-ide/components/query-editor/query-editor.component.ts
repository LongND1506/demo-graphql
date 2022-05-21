import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import * as CodeMirror from 'codemirror';
import 'codemirror-graphql/hint';
import 'codemirror-graphql/lint';
import 'codemirror-graphql/mode';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/lint/lint';
import { GraphQLSchema, ValidationRule } from 'graphql';
import { IGNORE_HINT_KEY_CODES } from '../../constants';
@Component({
  selector: 'query-editor',
  templateUrl: './query-editor.component.html',
  styleUrls: ['./query-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QueryEditorComponent implements OnInit {
  @ViewChild('queryEditor', { static: true })
  _queryEditorEl: ElementRef;
  @Input() set schema(value: any) {
    if (value) {
      this._schema = value;
      this._initQueryEditor();
    }
  }
  get schema(): GraphQLSchema {
    return this._schema;
  }

  @Input() validationRules: ValidationRule[];

  @Output() queryEditorChanged = new EventEmitter();
  @Output() prettyQuery = new EventEmitter();

  public editor: CodeMirror.Editor;
  private _schema: GraphQLSchema;

  constructor() {}

  ngOnInit(): void {}

  private _initQueryEditor() {
    this.editor = CodeMirror.fromTextArea(this._queryEditorEl.nativeElement, {
      mode: 'graphql',
      tabSize: 2,
      showHint: true,
      htmlMode: true,
      lineNumbers: true,
      matchBrackets: true,
      autoRefresh: true,
      gutters: ['CodeMirror-lint-markers'],
      lint: {
        // @ts-expect-error
        schema: this.schema,
      },
      hintOptions: {
        // @ts-expect-error
        schema: this.schema,
        closeOnUnfocus: false,
        completeSingle: false,
      },
      extraKeys: {
        'Ctrl-Space': () =>
          this.editor.showHint({
            completeSingle: true,
          }),
        'Ctrl-F': this._onPrettyQuery.bind(this),
      },
    });

    this._listenEditorEvent();
  }

  private _onPrettyQuery(): void {
    this.prettyQuery.emit();
  }

  private _listenEditorEvent(): void {
    if (!this.editor) return;

    this.editor.on(
      'change',
      (editorInstance: CodeMirror.Editor, changed: CodeMirror.EditorChange) => {
        this.queryEditorChanged.emit(editorInstance.getValue('\n'));
      }
    );

    this.editor.on(
      'keyup',
      (editorInstance: CodeMirror.Editor, event: KeyboardEvent) => {
        if (
          !editorInstance.state.completionActive &&
          !IGNORE_HINT_KEY_CODES.includes(event.keyCode)
        ) {
          CodeMirror.commands.autocomplete(this.editor, null, {
            completeSingle: false,
          });
        }
      }
    );
  }
}
