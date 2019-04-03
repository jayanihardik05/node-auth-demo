import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UiModule } from "./ui/ui.module";
import { PagesModule } from "./pages/pages.module";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
  { path: '', loadChildren: './src/app/pages/pages.module#pagesmodule' },
  { path: '', loadChildren: './src/app/pages/ui.module#UiModule' }

];
@NgModule({
  imports: [RouterModule.forRoot(routes), UiModule, PagesModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
