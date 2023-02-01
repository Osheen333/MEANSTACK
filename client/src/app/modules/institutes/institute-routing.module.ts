import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstitutesComponent } from './institutes.component';

const routes: Routes = [
  {
    path: '',
    component: InstitutesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class InstituteRoutingModule {}
