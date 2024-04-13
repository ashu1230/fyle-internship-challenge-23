import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from  '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { SearchComponent } from './search/search.component';
import { SkeletonLoaderComponent } from './skeleton-loader/skeleton-loader.component';
import { ProfileComponent } from './profile/profile.component';
import { RepositoriesComponent } from './repositories/repositories.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ItemsPerPageComponent } from './items-per-page/items-per-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NouserComponent } from './nouser/nouser.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    SkeletonLoaderComponent,
    ProfileComponent,
    RepositoriesComponent,
    PaginationComponent,
    ItemsPerPageComponent,
    NouserComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    NgxSkeletonLoaderModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
