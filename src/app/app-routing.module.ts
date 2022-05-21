import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'graphql',
    loadChildren: () =>
      import('./modules/graphql-ide/graphql-ide.module').then(
        (m) => m.GraphqlIdeModule
      ),
  },
  {
    path: 'dynamic-form',
    loadChildren: () =>
      import('./modules/dynamic-form/dynamic-form.module').then(
        (m) => m.DynamicFormModule
      ),
  },
  { path: '**', redirectTo: 'graphql' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
