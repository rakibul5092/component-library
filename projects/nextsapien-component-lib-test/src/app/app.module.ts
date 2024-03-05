import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import {
  CheckboxModule,
  CircleProgressModule,
  InputFieldModule,
  MultiColoredTextModule,
  NextsapienComponentLibModule,
  OtpInputModule,
  ProfileCardModule,
  ProfileHeaderModule,
} from 'nextsapien-component-lib';
import { TelInputModule } from 'projects/nextsapien-component-lib/src/public-api';
import { AppComponent } from './app.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { CircleProgressComponent } from './components/circle-progress/circle-progress.component';
import { EmptyFillUpDemoComponent } from './components/empty-fill-up-demo/empty-fill-up-demo.component';
import { HomeComponent } from './components/home/home.component';
import { InformationCardComponent } from './components/information-card/information-card.component';
import { InputsComponent } from './components/inputs/inputs.component';
import { MultiColoredTextComponent } from './components/multi-colored-text/multi-colored-text.component';
import { MyMessageBoxDemoComponent } from './components/my-message-box-demo/my-message-box-demo.component';
import { OtpInputTestComponent } from './components/otp-input-test/otp-input-test.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { ProfileHeaderComponent } from './components/profile-header/profile-header.component';
import { SegmentTabsComponent } from './components/segment-tabs/segment-tabs.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TelInputDemoComponent } from './components/tel-input-demo/tel-input-demo.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'confirmation-dialog',
    loadChildren: () => import('./components/confirmation-modal-demo/confirmation-modal-demo.module').then((m) => m.ConfirmationModalDemoModule),
  },
  {
    path: 'checkbox',
    component: CheckboxComponent,
  },
  {
    path: 'circle-progress',
    component: CircleProgressComponent,
  },
  {
    path: 'multi-colored-text',
    component: MultiColoredTextComponent,
  },
  {
    path: 'profile-card',
    component: ProfileCardComponent,
  },
  {
    path: 'profile-header',
    component: ProfileHeaderComponent,
  },
  {
    path: 'segment-tabs',
    component: SegmentTabsComponent,
  },
  {
    path: 'buttons',
    component: ButtonsComponent,
  },
  {
    path: 'inputs',
    component: InputsComponent,
  },
  {
    path: 'information-card',
    component: InformationCardComponent,
  },
  {
    path: 'message-box',
    component: MyMessageBoxDemoComponent,
  },
  {
    path: 'empty-fill-up',
    component: EmptyFillUpDemoComponent,
  },
  {
    path: 'grid',
    loadChildren: () => import('./components/grid-demo/grid-demo.module').then((m) => m.GridDemoModule),
  },
  {
    path: 'column-management-modal',
    loadChildren: () => import('./components/column-management-modal-demo/column-management-modal-demo.module').then((m) => m.ColumnManagementModalDemoModule),
  },
  {
    path: 'grid-filters',
    loadChildren: () => import('./components/grid-filters-demo/grid-filters-demo.module').then((m) => m.GridFiltersDemoModule),
  },
  {
    path: 'otp-input',
    component: OtpInputTestComponent,
  },
  {
    path: 'input-field',
    loadChildren: () => import('./components/input-field-test/input-field-test.module').then((m) => m.InputFieldTestModule),
  },
  {
    path: 'tel-input',
    component: TelInputDemoComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    CheckboxComponent,
    CircleProgressComponent,
    MultiColoredTextComponent,
    ProfileCardComponent,
    ProfileHeaderComponent,
    SegmentTabsComponent,
    ButtonsComponent,
    InputsComponent,
    InformationCardComponent,
    MyMessageBoxDemoComponent,
    EmptyFillUpDemoComponent,
    OtpInputTestComponent,
    TelInputDemoComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    IonicModule.forRoot(),
    NextsapienComponentLibModule,
    TelInputModule,
    BrowserModule,
    BrowserAnimationsModule,
    CheckboxModule,
    CircleProgressModule,
    MultiColoredTextModule,
    ProfileCardModule,
    ProfileHeaderModule,
    FormsModule,
    ReactiveFormsModule,
    OtpInputModule,
    InputFieldModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
