import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicStorageModule } from '@ionic/storage';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// import { CategoryPage } from "../app/category-page/category-page.page"
// import { ProgressBarComponent } from '../app/progress-bar/progress-bar.component';

// for using RestAPI in my game
import { HttpClientModule } from '@angular/common/http';
import { CategoryPageModule } from './category-page/category-page.module';
import { HomePageModule } from './home/home.module';

// import { SQLite } from '@ionic-native/sqlite';
// import { Toast } from '@ionic-native/toast';

@NgModule({
	declarations: [ AppComponent ],
	entryComponents: [],
	imports: [
		BrowserModule,
		IonicModule.forRoot(),
		AppRoutingModule,
		HttpClientModule,
		CategoryPageModule,
		HomePageModule,
		IonicStorageModule.forRoot()
	],
	providers: [ StatusBar, SplashScreen, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy } ],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
