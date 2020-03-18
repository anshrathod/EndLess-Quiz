import { Component, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
declare var $: any;

@Component({
	selector: 'app-category-page',
	templateUrl: './category-page.page.html',
	styleUrls: [ './category-page.page.scss' ]
})
export class CategoryPage {
	@Input('data') data: any;
	cur_val: String;
	all_val: any;
	constructor(private modalCtrl: ModalController, private navparams: NavParams) {
		var modalCtrl = modalCtrl;
		this.cur_val = this.navparams.get('cur_cat');
		this.all_val = this.navparams.get('all_cat');
		this.populatecategories();
	}

	public closeCatModal() {
		this.modalCtrl.dismiss(this.cur_val);
	}
	private populatecategories() {
		console.log(this.cur_val);
		console.log(this.all_val);
		// var cat_div = $(".show-cats");
		// for (var i=0;i<this.all_val.length;i+=1){
		//   cat_div.appendChild(this.addRow())
		// }
	}
	public selectcategory(category) {
		console.log(category);
		this.modalCtrl.dismiss(category);
	}
}
