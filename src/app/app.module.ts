import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { UserFormComponent } from './shared/components/user-form/user-form.component';
import { RegisterComponent } from './pages/register/register.component';
import { PointsPlotComponent } from './shared/components/points-plot/points-plot.component';
import { PointsTableComponent } from './shared/components/points-table/points-table.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    PointsPlotComponent,
    PointsTableComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserFormComponent,
    HttpClientModule,
    CommonModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
