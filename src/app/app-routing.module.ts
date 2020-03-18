import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
	{ path: 'checkanswer', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
	{
		path: 'category-page',
		loadChildren: () => import('./category-page/category-page.module').then(m => m.CategoryPageModule)
	}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
