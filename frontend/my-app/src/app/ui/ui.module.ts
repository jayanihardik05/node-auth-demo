import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./header/header.component";
import { LoginComponent } from "./login/login.component";
import { Routes, RouterModule } from "@angular/router";
import { RegistationComponent } from './registation/registation.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ng6-toastr-notifications';
const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "registation", component: RegistationComponent }
];

@NgModule({
  declarations: [HeaderComponent, LoginComponent, RegistationComponent],
  imports: [CommonModule, FormsModule, ToastrModule.forRoot(), ReactiveFormsModule, HttpClientModule, RouterModule.forRoot(routes)],
  exports: [HeaderComponent, RouterModule]
})
export class UiModule { }
