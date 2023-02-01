import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from './../../shared/shared.module';
import { CreateInstituteComponent } from './create-institute/create-institute.component';
import { InstituteRoutingModule } from './institute-routing.module';
import { InstitutesComponent } from './institutes.component';
import { UpdateInstituteComponent } from './update-institute/update-institute.component';

@NgModule({
  declarations: [
    InstitutesComponent,
    CreateInstituteComponent,
    UpdateInstituteComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    InstituteRoutingModule,
    FlexLayoutModule,
  ],
  exports: [CommonModule],
})
export class InstituteModule {}
