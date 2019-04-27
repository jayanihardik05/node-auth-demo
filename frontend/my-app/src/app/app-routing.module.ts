import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UiModule } from "./ui/ui.module";
import { PagesModule } from "./pages/pages.module";
import { LoginComponent } from './ui/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  
  { path: '**', redirectTo: 'login', pathMatch: 'full' },

];
@NgModule({
  imports: [RouterModule.forRoot(routes), UiModule, PagesModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
