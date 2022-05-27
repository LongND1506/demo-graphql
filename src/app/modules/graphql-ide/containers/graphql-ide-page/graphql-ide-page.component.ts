import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { GraphQLSchema, parse, validate } from 'graphql';
import { BehaviorSubject, tap } from 'rxjs';
import { QueryEditorComponent } from '../../components';
import { GraphQLService } from '../../services';
import gqlPrettier from 'graphql-prettier';
import { JsonEditorOptions } from 'ang-jsoneditor';

@Component({
  selector: 'app-graphql-ide-page',
  templateUrl: './graphql-ide-page.component.html',
  styleUrls: ['./graphql-ide-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GraphqlIdePageComponent implements OnInit {
  @ViewChild('queryEditor', {static: true}) queryEditor: QueryEditorComponent;

  private _$schema = new BehaviorSubject<GraphQLSchema>(null);
  public $schema = this._$schema.asObservable();
  public validQuery: string;
  editorOptions: JsonEditorOptions

  queryResult: any;
  constructor(private _graphqlService: GraphQLService) {}

  ngOnInit(): void {
    this._graphqlService
      .getSchema()
      .pipe(tap((schema) => {
        this._$schema.next(schema);
      }))
      .subscribe();

    this.editorOptions = new JsonEditorOptions();
    this.editorOptions.modes = ['code']
    this.editorOptions.expandAll = true
  }

  public onEditorChange(value): void {
    try {
      const node = parse(value);
      const errors = validate(this._$schema.getValue(), node);
      
      if(errors?.length) {
        console.log(errors)
        throw new Error()
      }

      this.validQuery = value;
    } catch (error) {
      this.validQuery = null
      console.log("Invalid query")
    }
  }

  public exCuteQuery(): void {
    this._graphqlService.excuteQuery(this.validQuery).subscribe(
      value => {
        console.log(value)
        this.queryResult = value
      }
    );
  }
  
  public onPrettyQuery(): void {
    if(this.validQuery) {
      this.queryEditor.editor?.setValue(gqlPrettier(this.validQuery))
    }
  }
}
     