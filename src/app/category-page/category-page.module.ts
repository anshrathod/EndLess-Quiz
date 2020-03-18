import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoryPageRoutingModule } from './category-page-routing.module';

import { CategoryPage } from './category-page.page';

@NgModule({
	imports: [ CommonModule, FormsModule, IonicModule, CategoryPageRoutingModule ],
	declarations: [ CategoryPage ]
})
export class CategoryPageModule {}
