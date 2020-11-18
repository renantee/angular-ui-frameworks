import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBNGCNgoccqOQFLNOAPER7AqgCBKOZlyWE'
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    DashboardComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    TableListComponent,
    TypographyComponent,
    UserProfileComponent,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }