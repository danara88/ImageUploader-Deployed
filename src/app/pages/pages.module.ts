import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClipboardModule } from '@angular/cdk/clipboard';


import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UploaderComponent } from './uploader/uploader.component';

import { UploadFileDirective } from '../directives/upload-file.directive';


@NgModule({
  declarations: [
    RegisterComponent, 
    LoginComponent, 
    HomeComponent, 
    UploaderComponent,
    UploadFileDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ClipboardModule
  ],
  exports: [
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    UploaderComponent,
    ReactiveFormsModule,
  ]
})
export class PagesModule { }
