import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { DocumentExplorerComponent } from './components/document-explorer/document-explorer.component';
import { QueryEditorComponent } from './components/query-editor/query-editor.component';
import { QueryResultComponent } from './components/query-result/query-result.component';
import { VariableEditorComponent } from './components/variable-editor/variable-editor.component';
import { GraphqlIdePageComponent } from './containers/graphql-ide-page/graphql-ide-page.component';
import { GraphqlIdeRoutingModule } from './graphql-ide-routing.module';
import { GraphQLService } from './services';

const MODULES = [TypeaheadModule, TabsModule, NgxJsonViewerModule];

const COMPONENTS = [
  GraphqlIdePageComponent,
  QueryEditorComponent,
  VariableEditorComponent,
  QueryResultComponent,
  DocumentExplorerComponent,
];

const SERVICES = [GraphQLService];

@NgModule({
  imports: [
    ...MODULES,
    CommonModule,
    HttpClientModule,
    GraphqlIdeRoutingModule,
  ],
  declarations: [...COMPONENTS],
  providers: [...SERVICES],
})
export class GraphqlIdeModule {}
