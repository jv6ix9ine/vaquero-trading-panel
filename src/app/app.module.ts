import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material/material.module';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat/';
import { LoginComponent } from './components/login/login.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { SidenavComponent } from './components/sidenav/sidenav/sidenav.component';
import { BodyComponent } from './components/body/body/body.component';
import { UsersComponent } from './pages/users/users/users.component';
import { AddUserDialogComponent } from './components/add-user-dialog/add-user-dialog.component';

import { CattleComponent } from './pages/cattle/cattle.component';
import { CattleFormComponent } from './components/cattle-form/cattle-form.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { CattleUpdateComponent } from './components/cattle-update/cattle-update.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { OffersComponent } from './pages/offers/offers.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { OfferInformationComponent } from './pages/offer-information/offer-information.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SidenavComponent,
    BodyComponent,
    UsersComponent,
    AddUserDialogComponent,
    CattleComponent,
    CattleFormComponent,
    CattleUpdateComponent,
    OffersComponent,
    ChangePasswordComponent,
    OfferInformationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    NgxDropzoneModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
