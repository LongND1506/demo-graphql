import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraphqlIdePageComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: GraphqlIdePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GraphqlIdeRoutingModule {}
