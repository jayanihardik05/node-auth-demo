import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home/home.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { Routes, RouterModule } from "@angular/router";
import { ChangepassewordComponent } from './changepasseword/changepasseword.component';
import { HttpClientModule,HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ng6-toastr-notifications';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { StudentregistationComponent } from './studentregistation/studentregistation';
import { AuthGuard } from '../service/auth.guard';
import { AuthService } from '../service/auth.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { TokenInterceptorService } from '../service/token-interceptor.service';
const routes: Routes = [
  { path: "home", component: HomeComponent, canActivate:[AuthGuard] },
  { path: "dashboard", component: DashboardComponent,canActivate:[AuthGuard]  },
  { path: "uregistation", component: StudentregistationComponent,canActivate:[AuthGuard]  },
  { path: "changepassword", component: ChangepassewordComponent,canActivate:[AuthGuard]  }
];
@NgModule({
  declarations: [HomeComponent, DashboardComponent, StudentregistationComponent, ChangepassewordComponent],
  imports: [RouterModule.forChild(routes),NgxPaginationModule,Ng2SearchPipeModule,ToastrModule.forRoot(), CommonModule, FormsModule, HttpClientModule, FormsModule,
    ReactiveFormsModule],
    providers: [AuthService, AuthGuard,{
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }],
  exports: [RouterModule]
})
export class PagesModule { }
