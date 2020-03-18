import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
// import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
// declare var jquery:any;
import { GetquestionsService } from '../getquestions.service';
import { ThemeService } from '../theme.service';
declare var $: any;
import questionsoffline from '../../assets/offlinequestions.json';
import myscore from '../../assets/scoreboard.json';
import { CategoryPage } from '../category-page/category-page.page';
import { IonRouterOutlet } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';

const themes = {
	slightred: {
		light: '#EF9A9A'
	},
	red: {
		light: '#F44336'
	},
	anotherred: {
		light: '#FF1744'
	},
	darkred: {
		light: '#C62828'
	},
	slightpink: {
		light: '#F48FB1'
	},
	pink: {
		light: '#E91E63'
	},
	anotherpink: {
		light: '#F50057'
	},
	darkpink: {
		light: '#AD1457'
	},
	slightpurple: {
		light: '#CE93D8'
	},
	purple: {
		light: '#9C27B0'
	},
	anotherpurple: {
		light: '#D500F9'
	},
	darkpurple: {
		light: '#9C27B0'
	},
	slightdeeppurple: {
		light: '#B39DDB'
	},
	deeppurple: {
		light: '#673AB7'
	},
	anotherdeeppurple: {
		light: '#651FFF'
	},
	darkdeeppurple: {
		light: '#4527A0'
	},
	slightindigo: {
		light: '#9FA8DA'
	},
	indigo: {
		light: '#3F51B5'
	},
	anotherindigo: {
		light: '#3D5AFE'
	},
	darkindigo: {
		light: '#283593'
	},
	slightblue: {
		light: '#90CAF9'
	},
	blue: {
		light: '#2196F3'
	},
	anotherblue: {
		light: '#2979FF'
	},
	darkblue: {
		light: '#1565C0'
	},
	slightlightblue: {
		light: '#81D4FA'
	},
	lightblue: {
		light: '#03A9F4'
	},
	anotherlightblue: {
		light: '#00B0FF'
	},
	darklightblue: {
		light: '#0277BD'
	},
	slightcyan: {
		light: '#80DEEA'
	},
	cyan: {
		light: '#00BCD4'
	},
	anothercyan: {
		light: '#00E5FF'
	},
	darkcyan: {
		light: '#00838F'
	},
	slightteal: {
		light: '#80CBC4'
	},
	teal: {
		light: '#009688'
	},
	anotherteal: {
		light: '#1DE9B6'
	},
	darkteal: {
		light: '#00695C'
	},
	slightgreen: {
		light: '#A5D6A7'
	},
	green: {
		light: '#4CAF50'
	},
	anothergreen: {
		light: '#00E676'
	},
	darkgreen: {
		light: '#2E7D32'
	},
	slightlightgreen: {
		light: '#C5E1A5'
	},
	lightgreen: {
		light: '#8BC34A'
	},
	anotherlightgreen: {
		light: '#76FF03'
	},
	darklightgreen: {
		light: '#558B2F'
	},
	slightlime: {
		light: '#E6EE9C'
	},
	lime: {
		light: '#CDDC39'
	},
	anotherlime: {
		light: '#C6FF00'
	},
	darklime: {
		light: '#9E9D24'
	},
	slightyellow: {
		light: '#FFF59D'
	},
	yellow: {
		light: '#FFEB3B'
	},
	anotheryellow: {
		light: '#FFEA00'
	},
	darkyellow: {
		light: '#F9A825'
	},
	slightamber: {
		light: '#FFE082'
	},
	amber: {
		light: '#FFC107'
	},
	anotheramber: {
		light: '#FFC400'
	},
	darkamber: {
		light: '#FF8F00'
	},
	slightorange: {
		light: '#FFCC80'
	},
	orange: {
		light: '#FF9800'
	},
	anotherorange: {
		light: '#FF9100'
	},
	darkorange: {
		light: '#EF6C00'
	},
	slightdeeporange: {
		light: '#FFAB91'
	},
	deeporange: {
		light: '#FF5722'
	},
	anotherdeeporange: {
		light: '#FF3D00'
	},
	darkdeeporange: {
		light: '#D84315'
	},
	slightturquoise: {
		light: '#79D9CF'
	},
	turquoise: {
		light: '#0B7368'
	},
	anotherturquoise: {
		light: '#2E7870'
	},
	darkturquoise: {
		light: '#9AE6DE'
	}
};
const themenames = [
	'slightturquoise',
	'turquoise',
	'anotherturquoise',
	'darkturquoise',
	'slightred',
	'red',
	'anotherred',
	'darkred',
	'slightpink',
	'pink',
	'anotherpink',
	'darkpink',
	'slightpurple',
	'purple',
	'anotherpurple',
	'darkpurple',
	'slightdeeppurple',
	'deeppurple',
	'anotherdeeppurple',
	'darkdeeppurple',
	'slightindigo',
	'indigo',
	'anotherindigo',
	'darkindigo',
	'slightblue',
	'blue',
	'anotherblue',
	'darkblue',
	'slightlightblue',
	'lightblue',
	'anotherlightblue',
	'darklightblue',
	'slightcyan',
	'cyan',
	'anothercyan',
	'darkcyan',
	'slightteal',
	'teal',
	'anotherteal',
	'darkteal',
	'slightgreen',
	'green',
	'anothergreen',
	'darkgreen',
	'slightlightgreen',
	'lightgreen',
	'anotherlightgreen',
	'darklightgreen',
	'slightlime',
	'lime',
	'anotherlime',
	'darklime',
	'slightyellow',
	'yellow',
	'anotheryellow',
	'darkyellow',
	'slightamber',
	'amber',
	'anotheramber',
	'darkamber',
	'slightorange',
	'orange',
	'anotherorange',
	'darkorange',
	'slightdeeporange',
	'deeporange',
	'anotherdeeporange',
	'darkdeeporange'
];
@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: [ 'home.page.scss' ],
	styles: [
		`
			ion-content {
				background-color: var(--ion-background-color);
			}
		`
	]
})
export class HomePage {
	public answer_options: Array<string>;
	public question: String;
	public correct_ans: String;
	private getquest: GetquestionsService;
	public points: number;
	private counter: number;
	private questions = questionsoffline['questions'];
	private sleep = (milliseconds: number) => {
		return new Promise(resolve => setTimeout(resolve, milliseconds));
	};
	public items: any;
	public selectedItem: {};
	public category: string;
	private categoryoptions: string[];
	private userid: string;
	private usertheme: string;

	constructor(
		private getquestion: GetquestionsService,
		private theme: ThemeService,
		private modal: ModalController,
		private router: IonRouterOutlet,
		private storage: Storage,
		private statusbar: StatusBar
	) {
		this.statusbar.overlaysWebView(false);
		this.getquest = this.getquestion;
		this.getQuestion();
		this.counter = 1;
		this.points = myscore['score'];
		this.categoryoptions = [
			'RANDOM',
			'G.K',
			'BOOKS',
			'FILMS',
			'MUSIC',
			'MUSICALS',
			'TELEVISION',
			'VIDEO GAMES',
			'BOARD GAMES',
			'SCIENCE',
			'COMPUTERS',
			'MATHEMATICS',
			'MYTHOLOGY',
			'SPORTS',
			'GEOGRAPHY',
			'HISTORY',
			'POLITICS',
			'ART',
			'CELEBRITIES',
			'ANIMALS',
			'VEHICLES',
			'COMICS',
			'GADGETS',
			'ANIME',
			'CARTOON'
		];
		storage
			.get('usercategory')
			.then(val => {
				this.category = val;
			})
			.catch(err => {
				console.log(this.category);
				this.category = 'RANDOM';
				storage.set('usercategory ', this.category.toString());
			});
		storage
			.get('usertheme')
			.then(val => {
				this.usertheme = val;
				this.theme.setTheme(themes[this.usertheme.toString()]);
			})
			.catch(err => {
				this.usertheme = 'cyan';
				storage.set('usertheme ', this.usertheme.toString());
				this.theme.setTheme(themes[this.usertheme.toString()]);
			});
		storage
			.get('userid')
			.then(val => {
				this.userid = val;
			})
			.catch(err => {
				this.userid = this.makeid(16);
				storage.set('userid ', this.userid.toString());
			});
		storage
			.get('userpoints')
			.then(val => {
				this.points = val.toString();
				console.log(this.points);
			})
			.catch(err => {
				this.points = 1100;
				storage.set('userpoints', this.points.toString());
			});
	}

	public selectanswer(_event: any, ans: string, correct_ans: { toString: () => any }) {
		var w = $('ion-button');
		if (ans === correct_ans.toString()) {
			this.increasePoints();
		}
		for (var i = 2; i < w.length; i++) {
			var x = w[i].children;
			// x[0].addClass("answertext");
			if (ans === w[i].id && ans !== correct_ans.toString()) {
				this.decreasePoints();
				w[i].style.backgroundColor = '#F00';
			}
			if (w[i].id === correct_ans.toString()) {
				w[i].style.opacity = 1;
				w[i].style.backgroundColor = '#0F0';
				var x = w[i].children;
				x[0].style.color = 'rgb(0, 0, 0)';
			}
			w[i].disabled = true;
		}
		this.sleep(750).then(() => {
			this.getQuestion();
		});
	}

	private getQuestion() {
		this.getquest.getquestion().subscribe(
			(data: any) => {
				if (
					data['question'].length > 80 ||
					data['option1'].length > 25 ||
					data['option2'].length > 25 ||
					data['option3'].length > 25
				) {
					this.getQuestion();
				} else {
					this.question = data['question'].toUpperCase();
					this.answer_options = [
						data['option1'].toUpperCase(),
						data['option2'].toUpperCase(),
						data['option3'].toUpperCase()
					];
					this.correct_ans = data['correct_answer'].toUpperCase();
					this.answer_options.push(this.correct_ans.toString());
					this.shuffleArray(this.answer_options);
				}
			},
			(_error: any) => {
				var data = this.getOfflineQuestion();
				if (
					data['question'].length > 80 ||
					data['option1'].length > 25 ||
					data['option2'].length > 25 ||
					data['option3'].length > 25
				) {
					this.getQuestion();
				} else {
					this.question = data['question'].toUpperCase();
					this.answer_options = [
						data['option1'].toUpperCase(),
						data['option2'].toUpperCase(),
						data['option3'].toUpperCase()
					];
					this.correct_ans = data['correct_answer'].toUpperCase();
					this.answer_options.push(this.correct_ans.toString());
					this.shuffleArray(this.answer_options);
				}
			}
		);
	}

	private shuffleArray(array: any[]) {
		for (var i = array.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
	}

	public getOfflineQuestion() {
		var max = Object.keys(this.questions).length;
		var min = 0;
		var index = Math.floor(Math.random() * (max - min + 1) + min);
		var question = this.questions[index];
		return question;
	}

	private increasePoints() {
		if (this.counter < 1) {
			this.counter = 1;
		}
		this.counter += 0.1;
		var addnumber = 10 * this.counter;
		this.points = this.points + addnumber;
		this.storage.set('userpoints', this.points);
	}

	private decreasePoints() {
		if (this.counter > 1 || this.counter <= 0) {
			this.counter = 1;
		}
		this.counter -= 0.1;
		var addnumber = 10 * this.counter;
		this.points -= addnumber;
		this.storage.set('userpoints', this.points);
	}

	public skipquestion(_event: any) {
		this.getQuestion();
		this.points = this.points - 5;
		this.storage.set('userpoints', this.points);
	}

	public changeTheme() {
		var name = themenames[Math.floor(Math.random() * themenames.length)];
		this.theme.setTheme(themes[name]);
		this.usertheme = name;
		this.storage.set('usertheme', name.toString());
	}

	public async changeCategory() {
		const cat_modal = await this.modal.create({
			component: CategoryPage,
			swipeToClose: true,
			presentingElement: this.router.nativeEl,
			animated: true,
			backdropDismiss: false,
			showBackdrop: true,
			componentProps: {
				cur_cat: this.category,
				all_cat: this.categoryoptions
			}
		});

		cat_modal.onDidDismiss().then(data => {
			console.log(data);
			var prev_cat = this.category;
			this.category = data['data'];
			if (prev_cat !== this.category) {
				this.getQuestion();
				this.storage.set('usercategory', this.category.toUpperCase().toString());
			}
		});
		return cat_modal.present();
	}

	private makeid(length: number) {
		var result = '';
		var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		var charactersLength = characters.length;
		for (var i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}
}
