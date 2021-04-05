import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { UploaderComponent } from './pages/uploader/uploader.component';
import { UserGuard } from './guards/user.guard';


const routes: Routes = [
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'home/:flag', component: HomeComponent, canActivate: [UserGuard]},
    {path: 'uploader', component: UploaderComponent, canActivate: [UserGuard]},
    {path: '**', pathMatch: 'full', redirectTo: '/home/1'}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}