import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
// tslint:disable-next-line:max-line-length
import { MatButtonModule, MatButtonToggleModule, MatCardModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatPaginatorModule, MatProgressSpinnerModule, MatRadioModule, MatSelectModule, MatSliderModule, MatSlideToggleModule, MatSortModule, MatTableModule, MatToolbarModule, MatTooltipModule } from '@angular/material';
import { MaterialCmsAdminModule } from 'material-cms-admin';
import { CanvasPhotoCompressor, CanvasPhotoResizer, GDriveAssetUploader } from 'material-cms-providers';
import { MhGeneralErrorModule } from 'mh-general-error';
import { MhInputDateModule } from 'mh-input-date';
import { MhInputFileModule } from 'mh-input-file';
import { MhInputTextModule } from 'mh-input-text';
import { MhPageTitleModule } from 'mh-page-title';
import { AdminAboutUsEditComponent } from './about-us/admin-about-us-edit.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './dashboard/admin-dashboard.component';
import { AdminEventsComponent } from './events/admin-events.component';
import { AdminWinesEditComponent } from './wines/admin-wines-edit.component';

@NgModule({
  imports: [
    AdminRoutingModule,
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MaterialCmsAdminModule.forRoot(CanvasPhotoCompressor, CanvasPhotoResizer, GDriveAssetUploader),
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,
    MhGeneralErrorModule,
    MhInputDateModule,
    MhInputFileModule,
    MhInputTextModule,
    MhPageTitleModule,
    MatExpansionModule,
  ],
  declarations: [
    AdminAboutUsEditComponent,
    AdminDashboardComponent,
    AdminEventsComponent,
    AdminWinesEditComponent,
  ],
})
export class AdminModule { }
